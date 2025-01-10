import { db, quizzes, userQuizHistory } from '../../..';
import { count, desc, eq } from 'drizzle-orm';
import { UserQuizHistoryLog } from '@article-quiz/shared-types';

type Input = {
  userId: string;
  offset: number;
  limit: number;
};

type Output = { history: UserQuizHistoryLog[]; totalPages: number };

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
  const _count = await db
    .select({
      count: count(),
    })
    .from(userQuizHistory)
    .rightJoin(quizzes, eq(userQuizHistory.quiz, quizzes.id))
    .where(eq(userQuizHistory.user, userId));

  return {
    history: res.map((record) => ({
      quizSource: record.quizzes.source,
      createdAt: record.user_quiz_history!.createdAt!.toISOString(),
      title: record.quizzes.title ?? undefined,
    })),
    totalPages: Math.ceil(_count[0].count / limit),
  };
};
