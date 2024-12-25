import { log } from '@article-quiz/logger';
import { createQuiz as saveQuizToDb, updateJob } from '@article-quiz/db';
import { InputContent, JobStatus } from '@article-quiz/shared-types';
import {
  DocumentType,
  genQuiz,
  LlmConfig,
} from '@article-quiz/quiz-generation-llm';
import { mdGenOpts } from '@article-quiz/utils';
import { mdToPdf } from 'md-to-pdf';
import { htmlToMd, urlToMd } from '@article-quiz/jina-ai';

type Input = {
  id: number;
  data: InputContent;
  unstructuredApiUrl: string;
  unstructuredApiKey: string;
  modelUsed: string;
  llmConfig: LlmConfig;
};

export const handleJob = async ({ data, id, modelUsed, llmConfig }: Input) => {
  const quizSource = data.contentType === 'url' ? data.url : data.content;
  log.debug(`Handling job for source ${quizSource}`);
  try {
    await updateJob({
      id,
      status: JobStatus.STARTED,
    });
    log.debug(`Getting MD pdf from buffer`);
    const pdf = await mdToPdf({
      content:
        data.contentType === 'url'
          ? await urlToMd({
              url: data.url,
              ...mdGenOpts,
            })
          : await htmlToMd({
              html: data.content,
              ...mdGenOpts,
            }),
    });
    log.debug(`Generating quiz`);
    const startTime = Date.now();
    const quiz = await genQuiz({
      llmConfig,
      documentInput: {
        documentType: DocumentType.MD,
        unstructuredApiKey: '',
        unstructuredApiUrl: '',
      },
      buffer:
        data.contentType === 'url'
          ? Buffer.from(
              await urlToMd({
                url: data.url,
                ...mdGenOpts,
              }),
              'utf-8'
            )
          : pdf.content,
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
