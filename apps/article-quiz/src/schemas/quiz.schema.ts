import { z } from 'zod';

const QuizAnswerSchema = z.object({
  isCorrect: z.boolean(),
  text: z.string(),
});

const QuizQuestionSchema = z.object({
  question: z.string(),
  answers: z.array(QuizAnswerSchema),
  sourceQuote: z.string(),
});

export const QuizSchema = z.object({
  questions: z.array(QuizQuestionSchema),
});
