import { Injectable } from '@nestjs/common';
import { createQuiz as _createQuiz } from './methods/create-quiz';
import { getQuiz as _getQuiz } from './methods/get-quiz';

@Injectable()
export class QuizService {
  createQuiz(input: Parameters<typeof _createQuiz>[0]) {
    return _createQuiz({
      ...(input as Parameters<typeof _createQuiz>[0]),
    });
  }
  getQuiz(input: Parameters<typeof _getQuiz>[0]) {
    return _getQuiz(input);
  }
}
