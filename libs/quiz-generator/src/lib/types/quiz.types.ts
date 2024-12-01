export type QuizAnswer = {
  isCorrect: boolean;
  text: string;
};

export type QuizQuestion = {
  question: string;
  answers: QuizAnswer[];
};

export type Quiz = {
  questions: QuizQuestion[];
};

export enum QuizGenerator {
  CHAT_GPT = 'chat-gpt',
}
