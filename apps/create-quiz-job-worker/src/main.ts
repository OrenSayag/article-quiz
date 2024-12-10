import { config } from 'dotenv';
config();
import { log } from '@article-quiz/logger';
import { listJobs } from '@article-quiz/db';
import { InputContent, JobStatus, JobType } from '@article-quiz/shared-types';
import { handleJob } from './methods/handle-job';

const UNSTRUCTURED_API_URL = process.env['UNSTRUCTURED_API_URL'];
const UNSTRUCTURED_API_KEY = process.env['UNSTRUCTURED_API_KEY'];

if (!UNSTRUCTURED_API_URL) {
  throw new Error('Missing env var UNSTRUCTURED_API_URL');
}

export const errors: Error[] = [];

const main = async (jobStatuses: JobStatus[]) => {
  if (jobStatuses.length === 0) {
    throw new Error(`jobStatus - should include at least one status`);
  }
  const jobs = await listJobs({
    type: JobType.CREATE_QUIZ,
    status: jobStatuses,
  });
  log.debug(
    `Processing ${jobs.length} ${JobType.CREATE_QUIZ} jobs with status${
      jobStatuses.length > 1 ? 'es' : ''
    } ${jobStatuses.join(', ')}`
  );
  for (let i = 0; i < jobs.length; i++) {
    try {
      const job = jobs[i];
      log.debug({
        jobData: job.data,
      });
      await handleJob({
        id: job.id,
        data: job.data as InputContent,
        unstructuredApiUrl: UNSTRUCTURED_API_URL,
        unstructuredApiKey: UNSTRUCTURED_API_KEY ?? '',
      });
    } catch (e) {
      errors.push(e.message);
    }
  }
  if (errors.length > 0) {
    log.error('Some errors occurred during job handling.');
    log.error({ errors });
  }
};

main([JobStatus.QUEUED])
  .then(() => {
    log.debug('Finished');
    process.exit(0);
  })
  .catch((e) => {
    log.error(e);
    log.error('create-quiz-job-worker failed.');
    process.exit(1);
  });
