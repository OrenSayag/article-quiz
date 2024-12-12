import { ChatOllama } from '@langchain/ollama';
import { QuizGenerator, QuizGeneratorLlm } from './quiz-generator';
import { Quiz } from '@article-quiz/shared-types';
import { Replicate } from '@langchain/community/llms/replicate';
import runpodSdk from 'runpod-sdk';

export enum LlmHost {
  OLLAMA_LOCAL = 'ollama-local',
  REPLICATE = 'replicate',
  RUNPOD = 'runpod',
}

export type LlmConfig =
  | {
      host: LlmHost.REPLICATE;
      apiKey: string;
      model: `${string}/${string}:${string}`;
    }
  | {
      host: LlmHost.OLLAMA_LOCAL;
      model: string;
    }
  | {
      host: LlmHost.RUNPOD;
      endpointId: string;
      apiKey: string;
    };

export enum DocumentType {
  MD = 'md',
  PDF = 'pdf',
}

export type DocumentInput =
  | {
      documentType: DocumentType.MD;
      unstructuredApiKey?: string;
      unstructuredApiUrl: string;
    }
  | {
      documentType: DocumentType.PDF;
    };

type Input = {
  llmConfig: LlmConfig;
  buffer: Buffer;
  documentInput: DocumentInput;
};

type Output = Quiz;

export const genQuiz = async (input: Input): Promise<Output> => {
  const { llmConfig, buffer, documentInput } = input;
  let quizGeneratorLlm: QuizGeneratorLlm | undefined = undefined;
  if (llmConfig.host === LlmHost.OLLAMA_LOCAL) {
    quizGeneratorLlm = {
      type: llmConfig.host,
      model: new ChatOllama({
        model: llmConfig.model,
        temperature: 0.1,
        maxRetries: 2,
        format: 'json',
        keepAlive: -1,
      }),
    };
  }
  if (llmConfig.host === LlmHost.REPLICATE) {
    quizGeneratorLlm = {
      type: llmConfig.host,
      model: new Replicate({
        model: llmConfig.model,
        apiKey: llmConfig.apiKey,
        input: {
          temperature: 0.1,
        },
      }),
    };
  }
  if (llmConfig.host === LlmHost.RUNPOD) {
    const runpod = runpodSdk(llmConfig.apiKey);
    const endpoint = runpod.endpoint(llmConfig.endpointId);
    if (!endpoint) {
      throw new Error(`Error instantiating runpod endpoint`);
    }
    quizGeneratorLlm = {
      type: llmConfig.host,
      model: endpoint,
    };
  }
  if (!quizGeneratorLlm) {
    throw new Error(`Logic error in genQuiz: quizGeneratorLlm is not defined.`);
  }
  // const generator = new QuizGenerator(5_000, 50, quizGeneratorLlm, 5);
  const generator = new QuizGenerator(1_000, 200, quizGeneratorLlm, 5);
  const quiz = await generator.generateQa({
    ...documentInput,
    buffer,
  });
  return quiz;
};
