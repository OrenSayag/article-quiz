import { Quiz } from '@article-quiz/shared-types';
import { db } from '../../../config';
import { quizzes } from '../../../schema';

type Input = {
  source: string;
  data: Quiz;
  modelUsed: string;
  timeToCreateInMs: number;
  title?: string;
};

type Output = {
  id: number;
};

export const createQuiz = async ({
  source,
  data,
  timeToCreateInMs,
  modelUsed,
  title,
}: Input): Promise<Output> => {
  const res = await db.insert(quizzes).values({
    source,
    data,
    timeToCreateInMs,
    modelUsed,
    title,
  });
  return {
    id: res[0].insertId,
  };
};
