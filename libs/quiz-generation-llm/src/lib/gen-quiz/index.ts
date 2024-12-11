import { ChatOllama } from '@langchain/ollama';
import { QuizGenerator } from './quiz-generator';
import { Quiz } from '@article-quiz/shared-types';
import { Replicate } from '@langchain/community/llms/replicate';

export enum LlmHost {
  OLLAMA_LOCAL = 'ollama-local',
  REPLICATE = 'replicate',
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
  let llm;
  if (llmConfig.host === LlmHost.OLLAMA_LOCAL) {
    llm = new ChatOllama({
      model: llmConfig.model,
      temperature: 0.1,
      maxRetries: 2,
      format: 'json',
      keepAlive: -1,
    });
  }
  if (llmConfig.host === LlmHost.REPLICATE) {
    llm = new Replicate({
      model: llmConfig.model,
      apiKey: llmConfig.apiKey,
      input: {
        temperature: 0.1,
      },
    });
  }
  const generator = new QuizGenerator(
    5_000,
    50,
    {
      type: llmConfig.host,
      model: llm,
    },
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
