import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import {
  GenQuizResponseBody,
  GetQuizResponseBody,
  InputContent,
  InputContentSchema,
} from '@article-quiz/shared-types';
import { ZodValidationPipe } from 'nestjs-zod';
import { z } from 'zod';
import { REQUEST } from '@nestjs/core';

@Controller('quiz')
export class QuizController {
  constructor(
    private readonly quizService: QuizService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  @Post('job')
  async genQuizJob(
    @Body(new ZodValidationPipe(z.array(InputContentSchema)))
    data: InputContent[]
  ): Promise<GenQuizResponseBody> {
    await Promise.all(
      data.map((d) =>
        this.quizService.createQuizJob({
          ...d,
        })
      )
    );
    return {
      success: true,
      message: `Successfully created create-quiz job${
        data.length > 1 ? 's' : ''
      }.`,
      data: undefined,
    };
  }
  @Get('')
  async getQuiz(
    @Query(new ZodValidationPipe(InputContentSchema)) inputContent: InputContent
  ): Promise<GetQuizResponseBody> {
    const quiz = await this.quizService.getQuiz({
      inputContent,
      userId: this.request.user!.id,
    });
    return {
      success: true,
      message: 'Successfully got quiz.',
      data: quiz,
    };
  }
}
