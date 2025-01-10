import { db, userQuizHistory } from '../../..';

type Input = {
  userId: string;
  quizId: number;
};

export const logUserQuizHistory = async ({ quizId, userId }: Input) => {
  await db.insert(userQuizHistory).values({
    user: userId,
    quiz: quizId,
  });
};
