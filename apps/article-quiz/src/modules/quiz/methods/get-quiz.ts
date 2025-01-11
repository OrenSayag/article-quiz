import { createQuiz, getQuiz as _getQuiz } from '@article-quiz/db';
import { InputContent, Quiz } from '@article-quiz/shared-types';
import { htmlToMd, urlToMd } from '@article-quiz/jina-ai';
import { mdGenOpts } from '@article-quiz/utils';
import { generateQuizClaude } from '@article-quiz/quiz-generator';
import { BadRequestException } from '@nestjs/common';

type Input = {
  inputContent: InputContent;
  userId: string;
  claudeApiKey: string;
};

type Output = Quiz & {
  id: number;
};

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
  if (inputContent.contentType === 'url') {
    inputContent.url = await validateUrl(inputContent.url);
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
  const { id } = await createQuiz({
    source,
    data: quiz,
    timeToCreateInMs: end.getTime() - start.getTime(),
    modelUsed: 'claude api',
    title: extractTitle(mdContent),
  });
  return { ...quiz, id };
};

function extractTitle(mdContent: string) {
  const titleRegex = /^Title:\s*(.*)/m;
  const match = mdContent.match(titleRegex);
  return match ? match[1] : undefined;
}

async function validateUrl(url: string): Promise<string> {
  const normalizedUrl = removeQueryParamsAndAnchors(url);
  const { status } = await fetch(url);
  const successfulStatus = status >= 200 && status < 300;
  if (!successfulStatus) {
    throw new BadRequestException(
      `Invalid status received from url ${normalizedUrl}. Status ${status}`
    );
  }
  return normalizedUrl;

  function removeQueryParamsAndAnchors(urlString: string): string {
    try {
      const url = new URL(urlString);
      url.search = ''; // Remove query parameters
      url.hash = ''; // Remove the anchor
      return url.toString();
    } catch (error) {
      console.error('Invalid URL:', error);
      return urlString;
    }
  }
}
