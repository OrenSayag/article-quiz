import { Injectable } from '@nestjs/common';
import { createQuizJob as _createQuizJob } from './methods/create-quiz-job';
import { getQuiz as _getQuiz } from './methods/get-quiz';
import { ConfigService } from '@nestjs/config';

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
  getQuiz(input: Omit<Parameters<typeof _getQuiz>[0], 'claudeApiKey'>) {
    return _getQuiz({ ...input, claudeApiKey: this.claudeApiKey });
  }
}
