import { InputContent, JobStatus, JobType } from '@article-quiz/shared-types';
import {
  createJob,
  createQuiz as saveQuizToDb,
  updateJob,
} from '@article-quiz/db';
import { getMdBuffer } from './get-md-buffer';
import { genQuiz } from './gen-quiz';
import { log } from '@article-quiz/logger';
import { InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';

type Input = {
  unstructuredApiKey?: string;
  unstructuredApiUrl: string;
  res: Response;
} & InputContent;

export const createQuiz = async (input: Input) => {
  log.debug(`Enter createQuiz`);
  const { contentType, unstructuredApiUrl, unstructuredApiKey, res } = input;
  const quizSource = contentType === 'url' ? input.url : input.content;
  log.debug(`Creating job ${JobType.CREATE_QUIZ}`);
  const { id: jobId } = await createJob({
    type: JobType.CREATE_QUIZ,
    data: { quizSource },
  });
  res.status(201).json('Started job to create quiz.');
  try {
    log.debug(`Getting MD buffer`);
    const mdBuffer = await getMdBuffer(input);
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
      id: jobId,
      status: JobStatus.SUCCESS,
    });
  } catch (e) {
    log.error(`Error in createQuiz.`);
    log.error(e);
    log.debug(`Updating job status to failure`);
    await updateJob({
      id: jobId,
      status: JobStatus.FAILED,
    });
    throw new InternalServerErrorException('Failed to generate quiz.');
  }
};
