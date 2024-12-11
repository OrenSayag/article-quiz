import { log } from '@article-quiz/logger';
import { createQuiz as saveQuizToDb, updateJob } from '@article-quiz/db';
import { InputContent, JobStatus } from '@article-quiz/shared-types';
import { genQuiz, LlmConfig } from '@article-quiz/quiz-generation-llm';
import { getMdBuffer } from '@article-quiz/utils';

type Input = {
  id: number;
  data: InputContent;
  unstructuredApiUrl: string;
  unstructuredApiKey: string;
  modelUsed: string;
  llmConfig: LlmConfig;
};

export const handleJob = async ({
  data,
  id,
  unstructuredApiUrl,
  unstructuredApiKey,
  modelUsed,
  llmConfig,
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
    const startTime = Date.now();
    const quiz = await genQuiz({
      markdownBuffer: mdBuffer,
      unstructuredApiUrl,
      unstructuredApiKey,
      llmConfig,
    });
    const endTime = Date.now();
    log.debug(`Saving quiz to db`);
    await saveQuizToDb({
      source: quizSource,
      data: quiz,
      timeToCreateInMs: endTime - startTime,
      modelUsed,
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
