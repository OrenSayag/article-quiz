import { ARTICLE_QUIZ_CLASS } from '../../constants';

export function createArticleQuizElement<T = HTMLElement>(tagName: string): T {
  const element = document.createElement(tagName);
  element.classList.add(ARTICLE_QUIZ_CLASS);
  return element as T;
}
