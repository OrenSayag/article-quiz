import { Injectable } from '@nestjs/common';
import { createQuiz as _createQuiz } from './methods/create-quiz';
import { getQuiz as _getQuiz } from './methods/get-quiz';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuizService {
  private readonly claudeApiKey;
  constructor(configService: ConfigService) {
    this.claudeApiKey = configService.getOrThrow('CLAUDE_API_KEY');
  }
  createQuiz(input: Parameters<typeof _createQuiz>[0]) {
    return _createQuiz({
      ...(input as Parameters<typeof _createQuiz>[0]),
    });
  }
  getQuiz(input: Omit<Parameters<typeof _getQuiz>[0], 'claudeApiKey'>) {
    return _getQuiz({ ...input, claudeApiKey: this.claudeApiKey });
  }
}
