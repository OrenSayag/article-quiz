import { getMdBuffer } from '@article-quiz/utils';
import { genQuiz } from '@article-quiz/quiz-generation-llm';

type HandlerJob = {
  input: string;
};

const handler = async ({ input }: HandlerJob) => {
  const url = input;
  const mdBuffer = await getMdBuffer({
    url,
    contentType: 'url',
  });
  const unstructuredApiUrl = process.env['UNSTRUCTURED_API_URL'];
  const unstructuredApiKey = process.env['UNSTRUCTURED_API_KEY'];
  if (!unstructuredApiUrl) {
    throw new Error('Missing UNSTRUCTURED_API_URL env var');
  }

  const quiz = await genQuiz({
    markdownBuffer: mdBuffer,
    unstructuredApiUrl,
    unstructuredApiKey,
  });
};
