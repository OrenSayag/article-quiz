import { ChatOllama } from '@langchain/ollama';
import { QuizGenerator } from './quiz-generator';
import { Quiz } from '@article-quiz/shared-types';

type Input = {
  markdownBuffer: Buffer;
  unstructuredApiKey?: string;
  unstructuredApiUrl: string;
};

type Output = Quiz;

export const genQuiz = async ({
  markdownBuffer,
  unstructuredApiUrl,
  unstructuredApiKey,
}: Input): Promise<Output> => {
  const llm = new ChatOllama({
    model: 'gemma2:27b',
    temperature: 0.1,
    maxRetries: 2,
    format: 'json',
    keepAlive: -1,
  });
  const generator = new QuizGenerator(
    5_000,
    50,
    llm,
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
