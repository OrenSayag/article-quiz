import { ChatOllama } from '@langchain/ollama';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import path from 'node:path';
import { UnstructuredLoader } from '@langchain/community/document_loaders/fs/unstructured';
import { Runnable } from '@langchain/core/runnables';
import { Quiz, QuizSchema } from '@article-quiz/shared-types';
import { genSysPrompt } from './gen-sys-prompt';
import { log } from '@article-quiz/logger';
import { LlmHost } from '@article-quiz/quiz-generation-llm';
import { Replicate } from '@langchain/community/llms/replicate';
import { EndpointCompletedOutput, EndpointInputPayload } from 'runpod-sdk';

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
    private readonly numberOfQuestions: number,
    private readonly unstructuredApiUrl: string,
    private readonly unstructuredApiKey?: string
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

  async generateQa(
    input:
      | (({ type: 'text' } | { type: 'file-path' }) & {
          content: string;
        })
      | {
          type: 'md';
          content: Buffer;
          fileName: string;
        }
      | {
          type: 'pdf';
          content: Blob;
          fileName: string;
        }
  ) {
    const { content, type } = input;
    let chunks;
    if (type === 'file-path') {
      const fileExt = path.extname(content);
      let loader;
      switch (fileExt) {
        case '.txt':
        case '.md':
          loader = new UnstructuredLoader(content, {
            apiKey: this.unstructuredApiKey,
            apiUrl: this.unstructuredApiUrl,
          });
          break;
        case '.pdf':
          loader = new PDFLoader(content);
          break;
        default:
          throw new Error(`File of type ${fileExt} is not supported.`);
      }
      chunks = await this.fileProcessing(loader);
    }
    if (type === 'md') {
      const loader = new UnstructuredLoader(
        {
          buffer: input.content,
          fileName: input.fileName,
        },
        {
          apiKey: this.unstructuredApiKey,
          apiUrl: this.unstructuredApiUrl,
        }
      );
      chunks = await this.fileProcessing(loader);
    }
    if (type === 'pdf') {
      const loader = new PDFLoader(content);
      chunks = await this.fileProcessing(loader);
    }
    if (type === 'text') {
      chunks = this.textSplitter(content);
    }
    this.numberOfOuestionsPerChunk = Math.ceil(
      this.numberOfQuestions / chunks.length
    );
    log.debug(`Length of chunks: ${chunks.length}`);

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
}
