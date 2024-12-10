import { Body, Controller, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import {
  GenQuizResponseBody,
  InputContent,
  InputContentSchema,
} from '@article-quiz/shared-types';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('')
  async genQuiz(
    @Body(new ZodValidationPipe(InputContentSchema)) data: InputContent
  ): Promise<GenQuizResponseBody> {
    await this.quizService.createQuiz({
      ...data,
    });
    return {
      success: true,
      message: 'Successfully generated quiz.',
    };
  }
}
