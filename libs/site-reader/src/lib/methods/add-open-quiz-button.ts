import { createArticleQuizElement } from './utils/create-article-quiz-element';

export function addOpenQuizButton(): HTMLButtonElement {
  const button = createArticleQuizElement<HTMLButtonElement>('button');
  button.textContent = 'Loading Quiz...';
  button.disabled = true;

  // Apply styles
  Object.assign(button.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '10px 15px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'not-allowed',
    opacity: '0.6',
  });

  document.body.appendChild(button);
  return button;
}
