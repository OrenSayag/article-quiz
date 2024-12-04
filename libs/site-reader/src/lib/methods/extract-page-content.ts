export function extractPageContent(): string {
  const body = document.body;

  if (!body) {
    throw new Error('The document body is not available.');
  }

  const clonedBody = body.cloneNode(true) as HTMLElement;

  const ignoredTags = [
    'script',
    'noscript',
    'style',
    'iframe',
    'ins',
    'embed',
    'object',
    'header',
    'footer',
    'nav',
    'aside',
    'form',
    'button',
    'input',
    'textarea',
    'select',
    'video',
    'audio',
    'canvas',
    'svg',
    'img',
  ];

  ignoredTags.forEach((tag) => {
    const elements = clonedBody.querySelectorAll(tag);
    elements.forEach((el) => el.remove());
  });

  return clonedBody.innerHTML;
}
