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
  const { generator, contentType, apiKey } = input;
  let quiz: Quiz;
  if (contentType === 'html') {
    // TODO: upload HTML to temp storage and delete on end/failure
    throw new Error('quizGenerator: html content not implemented');
  }
  switch (generator) {
    case QuizGenerator.CLAUDE:
      quiz = await generateQuizClaude({
        apiKey,
        url: input.url,
      });
      break;
    default:
      throw new Error('quizGenerator: invalid param: generator');
  }
  return quiz;
}
