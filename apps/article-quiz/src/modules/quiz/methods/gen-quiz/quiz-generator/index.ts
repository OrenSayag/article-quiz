import { ChatOllama } from '@langchain/ollama';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import path from 'node:path';
import { UnstructuredLoader } from '@langchain/community/document_loaders/fs/unstructured';
import { Runnable } from '@langchain/core/runnables';
import { QuizSchema } from '../../../../../schemas/quiz.schema';
import { Quiz } from '@article-quiz/shared-types';
import { genSysPrompt } from './gen-sys-prompt';
import { log } from '@article-quiz/logger';

export class QuizGenerator {
  numberOfOuestionsPerChunk: number;
  constructor(
    private readonly chunkSize: number,
    private readonly chunkOverlap: number,
    private readonly llm: ChatOllama,
    private readonly numberOfQuestions: number,
    private readonly unstructuredApiUrl: string,
    private readonly unstructuredApiKey?: string
  ) {
    llm.bindTools([QuizSchema]);
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
    const prompt = ChatPromptTemplate.fromTemplate(genSysPrompt());

    const chain = prompt.pipe(this.llm);

    return chain;
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
    const llmChain = this.createLlmChain();
    const quiz: Quiz = { questions: [] };
    for (const chunk of chunks) {
      const now = new Date().getTime();
      const { content: subQuizJson } = await llmChain.invoke({
        context: chunk,
      });
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
