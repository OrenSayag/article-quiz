'use server';

import { userIdHeaderName } from '@article-quiz/shared-types';

type Input = {
  path: string;
  options?: RequestInit;
  userId: string;
};

export const sendRequestToBackend = async ({
  path,
  options,
  userId,
}: Input) => {
  const baseUrl = process.env['API_BASE_URL']!;
  return fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
      [userIdHeaderName]: userId,
    },
  });
};
