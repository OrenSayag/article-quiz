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
  CLAUDE = 'claude',
  GPT_4_O = 'gpt-4o',
  ARTICLE_QUIZ = 'article-quiz',
}
