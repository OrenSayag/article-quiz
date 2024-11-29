import { extractPageContent } from './extract-page-content';
import { addOpenQuizButton } from './add-open-quiz-button';
import { fetchQuizData } from './fetch-quiz-data';
import { enableOpenQuizButton } from './enable-open-quiz-button';
import { cleanupSiteReaderElements } from './utils/cleanup-article-quiz-elements';

type Input =
  | {
      darkMode?: boolean;
    }
  | undefined;

export function siteReader(input: Input) {
  const { darkMode } = input || {};
  cleanupSiteReaderElements();
  const content = extractPageContent();
  const button = addOpenQuizButton();
  fetchQuizData().then((quiz) => {
    enableOpenQuizButton({
      button,
      quiz,
      darkMode,
    });
  });
  console.log({
    pageContent: content,
  });
}
