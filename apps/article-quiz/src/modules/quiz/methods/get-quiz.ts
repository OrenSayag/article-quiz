import { getQuiz as _getQuiz } from '@article-quiz/db';

type Input = {
  quizSource: string;
};

export const getQuiz = async ({ quizSource }: Input) => {
  return _getQuiz({
    type: 'quiz-source',
    quizSource,
  });
};
