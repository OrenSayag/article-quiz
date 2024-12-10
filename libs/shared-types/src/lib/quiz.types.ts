import { z } from 'zod';
import { ApiBaseResponse } from './app.types';

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

const quizAnswerSchema = z.object({
  isCorrect: z.boolean(),
  text: z.string(),
});
const quizQuestionSchema = z.object({
  question: z.string(),
  answers: z.array(quizAnswerSchema),
});

export const quizSchema = z.object({
  questions: z.array(quizQuestionSchema),
});

export type GenQuizResponseBody = ApiBaseResponse<undefined>;

export type GetQuizResponseBody = ApiBaseResponse<Quiz>;
