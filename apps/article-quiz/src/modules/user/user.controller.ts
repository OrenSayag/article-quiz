import { Body, Controller, Get, Inject, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { REQUEST } from '@nestjs/core';
import {
  GetUserInfoResponse,
  getUserQuizHistoryParams,
  GetUserQuizHistoryResponseBody,
  UpdateEnabledSitesResponse,
  updateEnabledSitesSchema,
} from '@article-quiz/shared-types';
import { createZodDto } from 'nestjs-zod';

class UpdateEnabledSitesDto extends createZodDto(updateEnabledSitesSchema) {}
class GetUserQuizHistoryParamsDto extends createZodDto(
  getUserQuizHistoryParams
) {}

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(REQUEST) private readonly request: Request
  ) {}
  @Get()
  async getUser(): Promise<GetUserInfoResponse> {
    const userInfo = await this.userService.getUser(this.request.user!.id);
    return {
      success: true,
      message: 'Successfully got user info',
      data: userInfo,
    };
  }
  @Put('enabled-sites')
  async updateEnabledSites(
    @Body() data: UpdateEnabledSitesDto
  ): Promise<UpdateEnabledSitesResponse> {
    await this.userService.updateUser({
      ...data,
      id: this.request.user!.id,
    });
    return {
      success: true,
      message: 'Successfully updated user enabled sites',
      data: undefined,
    };
  }
  @Get('quiz-history')
  async getUserQuizHistory(
    @Query() params: GetUserQuizHistoryParamsDto
  ): Promise<GetUserQuizHistoryResponseBody> {
    const quizHistoryLogs = await this.userService.getUserQuizHistory({
      userId: this.request.user!.id,
      ...params,
    });
    return {
      success: true,
      message: 'Successfully got user quiz history',
      data: quizHistoryLogs,
    };
  }
}
