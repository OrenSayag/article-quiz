import { Quiz } from '@article-quiz/shared-types';
import { db } from '../../../config';
import { quizzes } from '../../../schema';

type Input = {
  source: string;
  data: Quiz;
};

type Output = {
  id: number;
};

export const createQuiz = async ({ source, data }: Input): Promise<Output> => {
  const res = await db.insert(quizzes).values({
    source,
    data,
  });
  return {
    id: res[0].insertId,
  };
};
