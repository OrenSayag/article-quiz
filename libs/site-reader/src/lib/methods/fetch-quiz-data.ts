import { Quiz } from '@article-quiz/shared-types';
import { ResDataExtractor } from '@orensayag/article-quiz-site-reader';

type Input = {
  requestConfig: Parameters<typeof fetch>;
  content: string;
  resDataExtractor?: ResDataExtractor;
};

export async function fetchQuizData({
  requestConfig,
  content,
  resDataExtractor,
}: Input): Promise<Quiz> {
  const res = await fetch(requestConfig[0], {
    ...requestConfig[1],
    body: JSON.stringify({ content }),
    method: 'POST',
    headers: {
      ...requestConfig[1]?.headers,
      'Content-Type': 'application/json',
    },
  });

  const resBody = await res.json();
  if (res.status === 200) {
    if (resDataExtractor) {
      return resDataExtractor(resBody);
    }
    return resBody;
  } else {
    throw Error('Failed to fetch quiz');
  }
}
