import { db } from '../../../config';
import { jobs } from '../../../schema';
import { InputContent, JobStatus, JobType } from '@article-quiz/shared-types';

type Input = {
  data: InputContent;
  type: JobType;
};

type Output = { id: number };

export const createJob = async ({ data, type }: Input): Promise<Output> => {
  const res = await db.insert(jobs).values({
    data,
    type,
    status: JobStatus.QUEUED,
  });
  return { id: res[0].insertId };
};
