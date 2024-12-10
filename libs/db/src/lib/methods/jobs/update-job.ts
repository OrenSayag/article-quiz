import { db } from '../../../config';
import { jobs } from '../../../schema';
import { eq } from 'drizzle-orm';
import { InputContent, JobStatus } from '@article-quiz/shared-types';

type Input = {
  id: number;
  data?: InputContent;
  status?: JobStatus;
};

export const updateJob = async ({ data, id, status }: Input): Promise<void> => {
  await db
    .update(jobs)
    .set({
      data,
      status,
    })
    .where(eq(jobs.id, id));
};
