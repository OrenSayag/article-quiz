import { JinaReaderOptions } from '../types';
import { createReaderHeaders } from './create-reader-headers';

type Input = {
  html: string;
} & JinaReaderOptions;

type Output = string;

export const htmlToMd = async ({
  html,
  excludedSelectors,
  removeAllImages,
}: Input): Promise<Output> => {
  const headers = createReaderHeaders({
    removeAllImages,
    excludedSelectors,
  });
  const res = await fetch(`https://r.jina.ai/`, {
    headers: { ...headers, 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({
      url: '',
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch content: ${res.statusText}`);
  }

  const markdown = await res.text();
  return markdown;
};
