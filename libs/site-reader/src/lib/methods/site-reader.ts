import { extractPageContent } from './extract-page-content';
import { addOpenQuizButton } from './add-open-quiz-button';
import { fetchQuizData } from './fetch-quiz-data';
import { enableOpenQuizButton } from './enable-open-quiz-button';
import { cleanupSiteReaderElements } from './utils/cleanup-article-quiz-elements';
import { markButtonError } from './mark-button-error';
import { Quiz } from '@article-quiz/shared-types';

export type ResDataExtractor = (resObj: Record<string, unknown>) => Quiz;

type Input = {
  darkMode?: boolean;
  requestConfig: Parameters<typeof fetch>;
  resDataExtractor?: ResDataExtractor;
};

export function siteReader({
  requestConfig,
  darkMode,
  resDataExtractor,
}: Input) {
  cleanupSiteReaderElements();
  const content = extractPageContent();
  const button = addOpenQuizButton();
  fetchQuizData({
    requestConfig,
    content,
    resDataExtractor,
  })
    .then((quiz) => {
      console.log({ quiz });
      enableOpenQuizButton({
        button,
        quiz,
        darkMode,
      });
    })
    .catch((err) => {
      console.log(err);
      markButtonError(button, err);
    });
  console.log({
    pageContent: content,
  });
}
