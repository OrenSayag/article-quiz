import { JinaReaderOptions } from '../types';
import { createReaderHeaders } from './create-reader-headers';

type Input = {
  url: string;
} & JinaReaderOptions;

type Output = string;

export const urlToMd = async ({
  url,
  excludedSelectors,
  removeAllImages,
}: Input): Promise<Output> => {
  const headers = createReaderHeaders({
    removeAllImages,
    excludedSelectors,
  });
  const res = await fetch(`https://r.jina.ai/${url}`, {
    headers,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch content: ${res.statusText}`);
  }

  const markdown = await res.text();
  return markdown;
};
