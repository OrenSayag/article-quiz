import { UserQuizHistoryLog } from '@article-quiz/shared-types';
import { db, quizzes, userQuizHistory } from '@article-quiz/db';
import { desc, eq } from 'drizzle-orm';

type Input = {
  userId: string;
};

type Output = UserQuizHistoryLog | undefined;

export const getLatestUserQuiz = async ({ userId }: Input): Promise<Output> => {
  const res = await db
    .select()
    .from(userQuizHistory)
    .innerJoin(quizzes, eq(userQuizHistory.quiz, quizzes.id))
    .where(eq(userQuizHistory.user, userId))
    .orderBy(desc(userQuizHistory.createdAt))
    .limit(1);
  const [item] = res;
  if (!item) {
    return;
  }
  return {
    quizSource: item.quizzes.source,
    createdAt: item.user_quiz_history!.createdAt!.toISOString(),
    title: item.quizzes.title ?? undefined,
  };
};
