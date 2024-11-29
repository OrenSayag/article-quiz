import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
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

export const genQuizRequestBodySchema = z.object({
  type: z.literal('url'),
  data: z.object({
    url: z.string(),
  }),
});

export class GenQuizRequestBodyDto extends createZodDto(
  genQuizRequestBodySchema
) {}

export type GenQuizResponseBody = ApiBaseResponse<Quiz>;
