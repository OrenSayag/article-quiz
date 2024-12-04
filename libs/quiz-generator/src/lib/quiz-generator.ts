import { Quiz, QuizGenerator } from './types/quiz.types';
import { generateQuizOpenAiChatGPT } from './methods/generate-quiz-openai-chatgpt';
import { generateQuizWithReplicate } from './methods/generate-quiz-replicate';

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
  generator: QuizGenerator.CHAT_GPT | QuizGenerator.REPLICATE;
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
    case QuizGenerator.CHAT_GPT:
      quiz = await generateQuizOpenAiChatGPT({
        apiKey,
        url: input.url,
      });
      break;
    case QuizGenerator.REPLICATE:
      quiz = await generateQuizWithReplicate({
        apiKey,
        url: input.url,
      });
      break;
    default:
      throw new Error('quizGenerator: invalid param: generator');
  }
  return quiz;
}
