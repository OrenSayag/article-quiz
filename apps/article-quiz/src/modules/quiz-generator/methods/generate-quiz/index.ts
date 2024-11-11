import {
  GenQuizRequestBodyDto,
  Quiz,
  quizSchema,
} from '../../../../types/quiz.types';
import { OpenaiService } from '../../../openai/openai.service';
import { genPrompt } from './methods/gen-prompt';
import { log } from '@article-quiz/logger';
import { InternalServerErrorException } from '@nestjs/common';

type Input = GenQuizRequestBodyDto & {
  openAiService: OpenaiService;
};

type Output = Quiz;

export const generateQuiz = async ({
  data,
  type,
  openAiService,
}: Input): Promise<Output> => {
  let res: Quiz;
  switch (type) {
    case 'url':
      res = await promptByUrl();
  }
  if (!validateQuiz(res)) {
    log.error('Quiz is invalid!');
    log.error({ quiz: res });
    throw new InternalServerErrorException();
  }
  return res;
  async function promptByUrl(): Promise<Quiz> {
    const res = await openAiService.prompt({
      content: genPrompt({
        type,
        data: data.url,
      }),
    });
    log.debug({ res });
    return JSON.parse(res);
  }
  function validateQuiz(quiz: object) {
    return quizSchema.safeParse(quiz).success;
  }
};
