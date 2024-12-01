import {
  generateQuizWithChatGpt,
  setUpAssistant,
} from './methods/generate-quiz-chat-gpt';
import { Quiz, QuizGenerator } from './types/quiz.types';

type Input = {
  generator: QuizGenerator.CHAT_GPT;
  apiKey: string;
  assistantId: string;
} & {
  content: string;
};

type Output = Quiz;

export async function quizGenerator({
  generator,
  content,
  apiKey,
  assistantId,
}: Input): Promise<Output> {
  let quiz: Quiz;
  switch (generator) {
    case QuizGenerator.CHAT_GPT:
      quiz = await generateQuizWithChatGpt({
        apiKey,
        content,
        assistantId,
      });
      break;
    default:
      throw new Error('quizGenerator: invalid param: generator');
  }
  return quiz;
}

export async function generateChatGptAssistant(apiKey: string) {
  const res = await setUpAssistant(apiKey);
  return res;
}
