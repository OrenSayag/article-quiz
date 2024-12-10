import { InputContent } from '@article-quiz/shared-types';
import { htmlToMd, urlToMd } from '@article-quiz/jina-ai';

type Input = InputContent;

type Output = Buffer;

const mdGenOpts = {
  removeAllImages: true,
  excludedSelectors: ['header', 'nav'],
};

export const getMdBuffer = async (input: Input): Promise<Output> => {
  const { contentType } = input;
  let markdown = '';
  if (contentType === 'url') {
    markdown = await urlToMd({
      url: input.url,
      ...mdGenOpts,
    });
  }
  if (contentType === 'html') {
    markdown = await htmlToMd({
      html: input.content,
      ...mdGenOpts,
    });
  }
  return Buffer.from(markdown, 'utf8');
};
