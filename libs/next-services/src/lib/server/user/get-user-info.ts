import { GetUserInfoResponse, UserInfo } from '@article-quiz/shared-types';
import { sendRequestToBackend } from '@article-quiz/next-services/server';

type Input = {
  userId: string;
};

type Output = UserInfo;

export const getUserInfo = async ({ userId }: Input): Promise<Output> => {
  const res = await sendRequestToBackend({
    path: 'user',
    userId,
  });
  const rbody: GetUserInfoResponse = await res.json();
  if (!rbody.success) {
    throw new Error('Failed to get user info');
  }
  return rbody.data;
};
