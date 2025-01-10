'use server';

import {
  GetUserQuizHistoryResponseBody,
  UserQuizHistoryLog,
} from '@article-quiz/shared-types';
import { sendRequestToBackend } from '@article-quiz/next-services/server';

type Input = {
  userId: string;
  page: number;
};

type Output = {
  history: UserQuizHistoryLog[];
  totalPages: number;
};

const RESULTS_PER_PAGE = 10;

export const getUserQuizHistory = async ({
  userId,
  page,
}: Input): Promise<Output> => {
  const res = await sendRequestToBackend({
    path: `user/quiz-history?${new URLSearchParams({
      offset: ((page - 1) * RESULTS_PER_PAGE).toString(),
      limit: RESULTS_PER_PAGE.toString(),
    })}`,
    userId,
  });
  const rbody: GetUserQuizHistoryResponseBody = await res.json();
  if (!rbody.success) {
    throw new Error('Failed to get user quiz history');
  }
  return rbody.data;
};
