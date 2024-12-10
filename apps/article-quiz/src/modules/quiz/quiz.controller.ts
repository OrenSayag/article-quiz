import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import {
  GenQuizResponseBody,
  GetQuizResponseBody,
  InputContent,
  InputContentSchema,
} from '@article-quiz/shared-types';
import { ZodValidationPipe } from 'nestjs-zod';
import { z } from 'zod';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post('')
  async genQuiz(
    @Body(new ZodValidationPipe(z.array(InputContentSchema)))
    data: InputContent[]
  ): Promise<GenQuizResponseBody> {
    await Promise.all(
      data.map((d) =>
        this.quizService.createQuiz({
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
