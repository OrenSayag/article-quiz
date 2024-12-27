import { InputContent, JobType } from '@article-quiz/shared-types';
import { createJob } from '@article-quiz/db';

type Input = InputContent;

export const createQuizJob = async (input: Input) => {
  await createJob({
    type: JobType.CREATE_QUIZ,
    data: input,
  });
};
