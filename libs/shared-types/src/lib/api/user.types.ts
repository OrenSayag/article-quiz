import { z } from 'zod';
import { ApiBaseResponse, numericStringSchema } from '../app.types';
import { UserInfo } from '../auth.types';
import { UserQuizHistoryLog } from '../quiz.types';

export const updateEnabledSitesSchema = z.object({
  enabledSites: z.array(z.string()),
});

export type UpdateEnabledSitesParams = z.infer<typeof updateEnabledSitesSchema>;

export type GetUserInfoResponse = ApiBaseResponse<UserInfo>;

export type UpdateEnabledSitesResponse = ApiBaseResponse<undefined>;

export const getUserQuizHistoryParams = z.object({
  offset: numericStringSchema.transform((val) => Number(val)),
  limit: numericStringSchema.transform((val) => Number(val)),
});

export type GetUserQuizHistoryLogParams = z.infer<
  typeof getUserQuizHistoryParams
>;

export type GetUserQuizHistoryResponseBody = ApiBaseResponse<{
  history: UserQuizHistoryLog[];
  totalPages: number;
}>;
