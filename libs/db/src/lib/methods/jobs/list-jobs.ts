import { JobStatus, JobType } from '@article-quiz/shared-types';
import { db } from '../../../config';
import { jobs } from '../../../schema';
import { and, eq, inArray } from 'drizzle-orm';

type Input = {
  status?: JobStatus[];
  type: JobType;
};

export const listJobs = async ({ type, status }: Input) => {
  return db
    .select()
    .from(jobs)
    .where(
      and(
        status ? inArray(jobs.status, status) : undefined,
        eq(jobs.type, type)
      )
    );
};
