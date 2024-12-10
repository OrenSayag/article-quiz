import { Injectable } from '@nestjs/common';
import { createQuiz as _createQuiz } from './methods/create-quiz';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuizService {
  constructor(private readonly configService: ConfigService) {}
  createQuiz(
    input: Omit<
      Parameters<typeof _createQuiz>[0],
      'unstructuredApiUrl' | 'unstructuredApiKey'
    >
  ) {
    return _createQuiz({
      ...(input as Parameters<typeof _createQuiz>[0]),
      unstructuredApiKey: this.configService.get('UNSTRUCTURED_API_KEY'),
      unstructuredApiUrl: this.configService.getOrThrow('UNSTRUCTURED_API_URL'),
    });
  }
}
