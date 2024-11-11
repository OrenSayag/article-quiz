import {
  GenQuizRequestBodyDto,
  Quiz,
  quizSchema,
} from '../../../../types/quiz.types';
import { OpenaiService } from '../../../openai/openai.service';
import { genPrompt } from './methods/gen-prompt';
import { log } from '@article-quiz/logger';
import { InternalServerErrorException } from '@nestjs/common';
import { Cache } from 'cache-manager';

type Input = GenQuizRequestBodyDto & {
  openAiService: OpenaiService;
  cacheManager: Cache;
};

type Output = Quiz;

export const generateQuiz = async ({
  data,
  type,
  openAiService,
  cacheManager,
}: Input): Promise<Output> => {
  let res: Quiz;
  switch (type) {
    case 'url':
      res = await getQuizByUrl();
  }
  if (!validateQuiz(res)) {
    log.error('Quiz is invalid!');
    log.error({ quiz: res });
    throw new InternalServerErrorException();
  }
  return res;
  async function getQuizByUrl(): Promise<Quiz> {
    const cached = await cacheManager.get(data.url);
    if (cached) {
      return JSON.parse(cached as string);
    }
    const res = await openAiService.prompt({
      content: genPrompt({
        type,
        data: data.url,
      }),
    });
    await cacheManager.set(data.url, res);
    return JSON.parse(res);
  }
  function validateQuiz(quiz: object) {
    return quizSchema.safeParse(quiz).success;
  }
};
