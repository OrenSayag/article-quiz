import { Injectable } from '@nestjs/common';
import { createQuizJob as _createQuizJob } from './methods/create-quiz-job';
import { getQuiz as _getQuiz } from './methods/get-quiz';
import { ConfigService } from '@nestjs/config';
import { getLatestUserQuiz, logUserQuizHistory } from '@article-quiz/db';

@Injectable()
export class QuizService {
  private readonly claudeApiKey;
  constructor(configService: ConfigService) {
    this.claudeApiKey = configService.getOrThrow('CLAUDE_API_KEY');
  }
  createQuizJob(input: Parameters<typeof _createQuizJob>[0]) {
    return _createQuizJob({
      ...(input as Parameters<typeof _createQuizJob>[0]),
    });
  }
  async getQuiz(
    input: Omit<
      Parameters<typeof _getQuiz>[0] & {
        userId: string;
      },
      'claudeApiKey'
    >
  ) {
    const quiz = await _getQuiz({ ...input, claudeApiKey: this.claudeApiKey });
    const latestQuiz = await getLatestUserQuiz({
      userId: input.userId,
    });
    if (
      input.inputContent.contentType === 'url' &&
      latestQuiz?.quizSource !== input.inputContent.url
    ) {
      await logUserQuizHistory({
        userId: input.userId,
        quizId: quiz.id,
      });
    }
    return { ...quiz, id: undefined };
  }
}
