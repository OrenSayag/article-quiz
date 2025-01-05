import { z } from 'zod';
import { ApiBaseResponse } from '../app.types';
import { UserInfo } from '../auth.types';

export const updateEnabledSitesSchema = z.object({
  enabledSites: z.array(z.string()),
});

export type UpdateEnabledSitesParams = z.infer<typeof updateEnabledSitesSchema>;

export type GetUserInfoResponse = ApiBaseResponse<UserInfo>;

export type UpdateEnabledSitesResponse = ApiBaseResponse<undefined>;
