import { getQuiz as _getQuiz } from '@article-quiz/db';
import { InputContent } from '@article-quiz/shared-types';

type Input = {
  inputContent: InputContent;
  claudeApiKey: string;
};

export const getQuiz = async ({ inputContent, claudeApiKey }: Input) => {
  return _getQuiz({
    type: 'quiz-source',
    claudeApiKey,
    inputContent,
  });
};
