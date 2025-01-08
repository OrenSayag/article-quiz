import { GetQuizResponseBody, InputContent } from '@article-quiz/shared-types';
import { sendRequestToBackend } from '@article-quiz/next-services/server';

type Input = {
  userId: string;
  type: InputContent['contentType'];
  source: string;
};

type Output = GetQuizResponseBody & { status: number };

export const getQuiz = async ({
  userId,
  source,
  type,
}: Input): Promise<Output> => {
  const sourceKeyName = type === 'url' ? 'url' : 'content';
  const searchParams = new URLSearchParams({
    [sourceKeyName]: source,
    contentType: type,
  });
  const res = await sendRequestToBackend({
    path: `quiz?${searchParams.toString()}`,
    userId,
  });
  const rbody: GetQuizResponseBody = await res.json();
  return { ...rbody, status: res.status };
};
