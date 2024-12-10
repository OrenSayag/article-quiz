import { Quiz } from '@article-quiz/shared-types';
import { db } from '../../../config';
import { quizzes } from '../../../schema';

type Input = {
  source?: string;
  data?: Quiz;
};

export const updateQuiz = async ({ source, data }: Input) => {
  const res = await db.update(quizzes).set({
    source,
    data,
  });
  return {
    id: res[0].insertId,
  };
};
