import { db } from '../../../config';
import { jobs } from '../../../schema';
import { JobStatus, JobType } from '@article-quiz/shared-types';

type Input = {
  data: object;
  type: JobType;
};

type Output = { id: number };

export const createJob = async ({ data, type }: Input): Promise<Output> => {
  const res = await db.insert(jobs).values({
    data,
    type,
    status: JobStatus.STARTED,
  });
  return { id: res[0].insertId };
};
