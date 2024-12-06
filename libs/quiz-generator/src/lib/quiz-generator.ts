import { Quiz, QuizGenerator } from './types/quiz.types';
import { generateQuizClaude } from './methods/generate-quiz-claude';

export type InputContent =
  | {
      contentType: 'html';
      content: string;
    }
  | {
      contentType: 'url';
      url: string;
    };

type Input = {
  generator: QuizGenerator.CLAUDE;
  apiKey: string;
} & InputContent;

type Output = Quiz;

export async function quizGenerator(input: Input): Promise<Output> {
  const { generator } = input;
  let quiz: Quiz;
  switch (generator) {
    case QuizGenerator.CLAUDE:
      quiz = await generateQuizClaude({
        ...input,
      });
      break;
    default:
      throw new Error('quizGenerator: invalid param: generator');
  }
  return quiz;
}
