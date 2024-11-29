import { extractPageContent } from './extract-page-content';

export function siteReader() {
  const content = extractPageContent();
  console.log({
    pageContent: content,
  });
}
