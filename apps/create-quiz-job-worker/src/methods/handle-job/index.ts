import { log } from '@article-quiz/logger';
import { createQuiz as saveQuizToDb, updateJob } from '@article-quiz/db';
import { InputContent, JobStatus } from '@article-quiz/shared-types';
import { getMdBuffer } from '../get-md-buffer';
import { genQuiz } from '../gen-quiz';

type Input = {
  id: number;
  data: InputContent;
  unstructuredApiUrl: string;
  unstructuredApiKey: string;
};

export const handleJob = async ({
  data,
  id,
  unstructuredApiUrl,
  unstructuredApiKey,
}: Input) => {
  const quizSource = data.contentType === 'url' ? data.url : data.content;
  log.debug(`Handling job for source ${quizSource}`);
  try {
    await updateJob({
      id,
      status: JobStatus.STARTED,
    });
    log.debug(`Getting MD buffer`);
    const mdBuffer = await getMdBuffer(data);
    log.debug(`Generating quiz`);
    const quiz = await genQuiz({
      markdownBuffer: mdBuffer,
      unstructuredApiUrl,
      unstructuredApiKey,
    });
    log.debug(`Saving quiz to db`);
    await saveQuizToDb({
      source: quizSource,
      data: quiz,
    });
    log.debug(`Updating job status to success`);
    await updateJob({
      id,
      status: JobStatus.SUCCESS,
    });
  } catch (e) {
    log.error(`Error in createQuiz.`);
    log.error(e);
    log.debug(`Updating job status to failure`);
    await updateJob({
      id,
      status: JobStatus.FAILED,
    });
    throw new Error('Failed to generate quiz.');
  }
};
