export function extractPageContent(): string {
  const body = document.body;

  if (!body) {
    throw new Error('The document body is not available.');
  }

  return body.innerHTML;
}
