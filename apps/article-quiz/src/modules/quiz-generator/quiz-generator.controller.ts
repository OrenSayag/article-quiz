import { Body, Controller, Post } from '@nestjs/common';
import {
  GenQuizRequestBodyDto,
  GenQuizResponseBody,
} from '@article-quiz/shared-types';
import { QuizGeneratorService } from './quiz-generator.service';

@Controller('quiz-generator')
export class QuizGeneratorController {
  constructor(private readonly quizGeneratorService: QuizGeneratorService) {}
  @Post()
  async genQuiz(
    @Body() data: GenQuizRequestBodyDto
  ): Promise<GenQuizResponseBody> {
    const quiz = await this.quizGeneratorService.generateQuiz({
      ...data,
    });
    return {
      success: true,
      message: 'Successfully generated quiz.',
      data: quiz,
    };
  }
}
