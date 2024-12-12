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

type Input = {
  markdownBuffer: Buffer;
  unstructuredApiKey?: string;
  unstructuredApiUrl: string;
  llmConfig: LlmConfig;
};

type Output = Quiz;

export const genQuiz = async ({
  markdownBuffer,
  unstructuredApiUrl,
  unstructuredApiKey,
  llmConfig,
}: Input): Promise<Output> => {
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
  const generator = new QuizGenerator(
    5_000,
    50,
    quizGeneratorLlm,
    5,
    unstructuredApiUrl,
    unstructuredApiKey
  );
  const quiz = await generator.generateQa({
    type: 'md',
    fileName: 'gen-quiz.md',
    content: markdownBuffer,
  });
  return quiz;
};
