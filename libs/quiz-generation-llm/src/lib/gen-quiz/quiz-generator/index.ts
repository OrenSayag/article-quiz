import { ChatOllama, OllamaEmbeddings } from '@langchain/ollama';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { UnstructuredLoader } from '@langchain/community/document_loaders/fs/unstructured';
import { Runnable } from '@langchain/core/runnables';
import { Quiz, QuizSchema } from '@article-quiz/shared-types';
import { genSysPrompt } from './gen-sys-prompt';
import { log } from '@article-quiz/logger';
import { DocumentInput, DocumentType, LlmHost } from '..';
import { Replicate } from '@langchain/community/llms/replicate';
import { EndpointCompletedOutput, EndpointInputPayload } from 'runpod-sdk';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createRetrievalChain } from 'langchain/chains/retrieval';

export type QuizGeneratorLlm =
  | {
      type: LlmHost.OLLAMA_LOCAL;
      model: ChatOllama;
    }
  | {
      type: LlmHost.REPLICATE;
      model: Replicate;
    }
  | {
      type: LlmHost.RUNPOD;
      model: {
        runSync(
          request: EndpointInputPayload,
          timeout?: number
        ): Promise<EndpointCompletedOutput>;
      };
    };

export class QuizGenerator {
  numberOfOuestionsPerChunk: number;
  constructor(
    private readonly chunkSize: number,
    private readonly chunkOverlap: number,
    private readonly llm: QuizGeneratorLlm,
    private readonly numberOfQuestions: number
  ) {
    if (llm.type === LlmHost.OLLAMA_LOCAL) {
      llm.model.bindTools([QuizSchema]);
    }
  }

  textSplitter(data: string): Promise<string[]> {
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: this.chunkSize,
      chunkOverlap: this.chunkOverlap,
    });
    const allSplits = textSplitter.splitText(data);
    return allSplits;
  }

  async fileProcessing(
    loader: PDFLoader | UnstructuredLoader
  ): Promise<string[]> {
    const data = await loader.load();
    let text = '';

    for (const page of data) {
      text += page.pageContent;
    }

    return this.textSplitter(text);
  }

  createLlmChain(): Runnable {
    if (this.llm.type !== LlmHost.OLLAMA_LOCAL) {
      throw new Error(
        `Invalid method call - should not call createLlmChain when llmHost is not ${LlmHost.OLLAMA_LOCAL}`
      );
    }
    const prompt = ChatPromptTemplate.fromTemplate(genSysPrompt());

    const chain = prompt.pipe(this.llm.model);

    return chain;
  }

  async invokeModel(context: string): Promise<string> {
    if (this.llm.type === LlmHost.OLLAMA_LOCAL) {
      const llmChain = this.createLlmChain();
      const { content } = await llmChain.invoke({
        context,
      });
      return content;
    }
    const prompt = genSysPrompt().replace(`{context}`, context);
    if (this.llm.type === LlmHost.REPLICATE) {
      const res = await this.llm.model.invoke(prompt);
      return res;
    }
    if (this.llm.type === LlmHost.RUNPOD) {
      const res = await this.llm.model.runSync({
        input: {
          prompt,
        },
      });
      return res.output as string;
    }
    throw new Error('Logic error in invokeModel');
  }

  async handleMarkdown({
    buffer,
    unstructuredApiUrl,
    unstructuredApiKey,
  }: {
    buffer: Buffer;
    unstructuredApiKey?: string;
    unstructuredApiUrl: string;
  }): Promise<Quiz> {
    const fileName = 'file';

    const loader = new UnstructuredLoader(
      {
        buffer: buffer,
        fileName: fileName,
      },
      {
        apiKey: unstructuredApiKey,
        apiUrl: unstructuredApiUrl,
      }
    );
    const chunks = await this.fileProcessing(loader);

    log.debug(`Length of chunks: ${chunks.length}`);

    this.numberOfOuestionsPerChunk = Math.ceil(
      this.numberOfQuestions / chunks.length
    );

    const quiz: Quiz = { questions: [] };
    for (const chunk of chunks) {
      const now = new Date().getTime();
      const subQuizJson = await this.invokeModel(chunk);

      const timeTakenToInvoke = (Date.now() - now) / 1_000 + ' seconds';
      log.debug({
        timeTakenToInvoke,
      });
      const subQuiz = JSON.parse(subQuizJson);
      quiz.questions = [...quiz.questions, ...subQuiz.questions];
      log.debug(
        `Finished digesting chunk ${chunks.indexOf(chunk) + 1}/${chunks.length}`
      );
    }
    return quiz;
  }

  async handlePdf({ buffer }: { buffer: Buffer }): Promise<Quiz> {
    if (this.llm.type !== LlmHost.OLLAMA_LOCAL) {
      throw new Error(`PDF support only for llm host ${LlmHost.OLLAMA_LOCAL}`);
    }
    const loader = new PDFLoader(new Blob([buffer]));
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: this.chunkSize,
      chunkOverlap: this.chunkOverlap,
    });

    log.debug('Loading pdf doc');
    const docs = await loader.load();

    log.debug('Splitting pdf doc');
    const splits = await textSplitter.splitDocuments(docs);

    log.debug('Creating vector store');
    const vectorstore = await MemoryVectorStore.fromDocuments(
      splits,
      // new OpenAIEmbeddings()
      new OllamaEmbeddings({
        model: 'mxbai-embed-large',
      })
    );

    const retriever = vectorstore.asRetriever();

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', genSysPrompt()],
      ['human', '{input}'],
    ]);

    const quizGenChain = await createStuffDocumentsChain({
      llm: this.llm.model,
      prompt,
    });

    log.debug('Creating retrieval chain');
    const ragChain = await createRetrievalChain({
      retriever,
      combineDocsChain: quizGenChain,
    });

    log.debug('Invoking chain');
    const results = await ragChain.invoke({
      input: 'Please create a quiz',
    });

    return JSON.parse(results.answer);
  }

  async generateQa(input: DocumentInput & { buffer: Buffer }) {
    const { documentType } = input;

    if (documentType === DocumentType.MD) {
      return await this.handleMarkdown(input);
    }
    if (documentType === DocumentType.PDF) {
      return await this.handlePdf(input);
    }

    throw new Error(
      `Logic error in generateQa - unhandled doc type ${documentType}`
    );
  }
}
