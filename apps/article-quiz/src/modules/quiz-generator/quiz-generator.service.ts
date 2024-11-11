import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { generateQuiz as _generateQuiz } from './methods/generate-quiz';

@Injectable()
export class QuizGeneratorService {
  constructor(
    private readonly openAiService: OpenaiService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  async generateQuiz(
    input: Omit<
      Parameters<typeof _generateQuiz>[0],
      'openAiService' | 'cacheManager'
    >
  ) {
    return _generateQuiz({
      ...input,
      openAiService: this.openAiService,
      cacheManager: this.cacheManager,
    });
  }
}
