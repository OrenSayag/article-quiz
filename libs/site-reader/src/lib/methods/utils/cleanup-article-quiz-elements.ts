import { ARTICLE_QUIZ_CLASS } from '../../constants';

export function cleanupSiteReaderElements() {
  const elements = document.querySelectorAll(`.${ARTICLE_QUIZ_CLASS}`);
  elements.forEach((element) => element.remove());
}
