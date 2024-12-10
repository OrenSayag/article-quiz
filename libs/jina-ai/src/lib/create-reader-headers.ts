import { JinaReaderOptions } from '../types';

type Input = JinaReaderOptions;

export const createReaderHeaders = ({
  removeAllImages,
  excludedSelectors,
}: Input) => {
  const headers: Record<string, string> = {};
  if (removeAllImages) {
    headers['X-Retain-Images'] = 'none';
  }
  if (excludedSelectors) {
    headers['X-Remove-Selector'] = excludedSelectors.join(', ');
  }
  return headers;
};
