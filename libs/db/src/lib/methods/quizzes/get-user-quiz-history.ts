import { db, quizzes, userQuizHistory } from '../../..';
import { desc, eq } from 'drizzle-orm';
import { UserQuizHistoryLog } from '@article-quiz/shared-types';

type Input = {
  userId: string;
  offset: number;
  limit: number;
};

type Output = UserQuizHistoryLog[];

export const getUserQuizHistory = async ({
  userId,
  offset,
  limit,
}: Input): Promise<Output> => {
  const res = await db
    .select()
    .from(userQuizHistory)
    .rightJoin(quizzes, eq(userQuizHistory.quiz, quizzes.id))
    .where(eq(userQuizHistory.user, userId))
    .offset(offset)
    .limit(limit)
    .orderBy(desc(userQuizHistory.createdAt));
  return res.map((record) => ({
    quizSource: record.quizzes.source,
    createdAt: record.user_quiz_history!.createdAt!.toISOString(),
  }));
};
