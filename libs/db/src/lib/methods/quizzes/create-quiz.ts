import { Quiz } from '@article-quiz/shared-types';
import { db } from '../../../config';
import { quizzes } from '../../../schema';

type Input = {
  source: string;
  data: Quiz;
  modelUsed: string;
  timeToCreateInMs: number;
};

type Output = {
  id: number;
};

export const createQuiz = async ({
  source,
  data,
  timeToCreateInMs,
  modelUsed,
}: Input): Promise<Output> => {
  const res = await db.insert(quizzes).values({
    source,
    data,
    timeToCreateInMs,
    modelUsed,
  });
  return {
    id: res[0].insertId,
  };
};
