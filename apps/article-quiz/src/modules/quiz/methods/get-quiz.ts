import { createQuiz, getQuiz as _getQuiz } from '@article-quiz/db';
import { InputContent, Quiz } from '@article-quiz/shared-types';
import { htmlToMd, urlToMd } from '@article-quiz/jina-ai';
import { mdGenOpts } from '@article-quiz/utils';
import { generateQuizClaude } from '@article-quiz/quiz-generator';

type Input = {
  inputContent: InputContent;
  claudeApiKey: string;
};

type Output = Quiz;

export const getQuiz = async ({
  inputContent,
  claudeApiKey,
}: Input): Promise<Output> => {
  const res = await _getQuiz({
    type: 'quiz-source',
    inputContent,
  });
  if (res !== 'not-found') {
    return res;
  }
  const source = (() => {
    switch (inputContent.contentType) {
      case 'url':
        return inputContent.url;
      case 'html':
        return inputContent.content;
    }
  })();
  const mdContent = await (() => {
    switch (inputContent.contentType) {
      case 'url':
        return urlToMd({
          url: inputContent.url,
          ...mdGenOpts,
        });
      case 'html':
        return htmlToMd({
          html: inputContent.content,
          ...mdGenOpts,
        });
    }
  })();
  const start = new Date();
  const quiz = await generateQuizClaude({
    apiKey: claudeApiKey,
    mdContent: mdContent,
  });
  const end = new Date();
  await createQuiz({
    source,
    data: quiz,
    timeToCreateInMs: end.getTime() - start.getTime(),
    modelUsed: 'claude api',
  });
  return quiz;
};
