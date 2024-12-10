import { db } from '../../../config';
import { quizzes } from '../../../schema';
import { eq } from 'drizzle-orm';
import { Quiz } from '@article-quiz/shared-types';
import { NotFoundException } from '@nestjs/common';

type Input =
  | {
      type: 'quiz-source';
      quizSource: string;
    }
  | {
      type: 'id';
      id: number;
    };

type Output = Quiz;

export const getQuiz = async (input: Input): Promise<Output> => {
  const { type } = input;
  let cond;
  if (type === 'id') {
    cond = eq(quizzes.id, input.id);
  }
  if (type === 'quiz-source') {
    cond = eq(quizzes.source, input.quizSource);
  }
  const res = await db.select().from(quizzes).where(cond);
  if (res.length === 0) {
    throw new NotFoundException('Quiz not found');
  }
  const [quizRecord] = res;
  return quizRecord.data;
};
