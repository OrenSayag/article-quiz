import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { QuizService } from './quiz.service';
import {
  GenQuizResponseBody,
  GetQuizResponseBody,
  InputContent,
  InputContentSchema,
} from '@article-quiz/shared-types';
import { ZodValidationPipe } from 'nestjs-zod';
import { Response } from 'express';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('')
  async genQuiz(
    @Body(new ZodValidationPipe(InputContentSchema)) data: InputContent,
    @Res() res: Response
  ): Promise<GenQuizResponseBody> {
    await this.quizService.createQuiz({
      ...data,
      res,
    });
    return {
      success: true,
      message: 'Successfully generated quiz.',
      data: undefined,
    };
  }
  @Get('')
  async getQuiz(
    @Query('quizSource') quizSource: string
  ): Promise<GetQuizResponseBody> {
    const quiz = await this.quizService.getQuiz({
      quizSource,
    });
    return {
      success: true,
      message: 'Successfully got quiz.',
      data: quiz,
    };
  }
}
