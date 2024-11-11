import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { generateQuiz as _generateQuiz } from './methods/generate-quiz';

@Injectable()
export class QuizGeneratorService {
  constructor(private readonly openAiService: OpenaiService) {}
  async generateQuiz(
    input: Omit<Parameters<typeof _generateQuiz>[0], 'openAiService'>
  ) {
    return _generateQuiz({ ...input, openAiService: this.openAiService });
  }
}
