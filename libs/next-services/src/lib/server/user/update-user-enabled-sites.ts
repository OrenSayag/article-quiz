'use server';

import {
  UpdateEnabledSitesParams,
  UpdateEnabledSitesResponse,
} from '@article-quiz/shared-types';
import { sendRequestToBackend } from '../utils/send-request-to-backend';

type Input = UpdateEnabledSitesParams & {
  userId: string;
};

type Output = UpdateEnabledSitesResponse & { status: number };

export const updateUserEnabledSites = async ({
  userId,
  ...params
}: Input): Promise<Output> => {
  const res = await sendRequestToBackend({
    path: 'user/enabled-sites',
    options: {
      method: 'PUT',
      body: JSON.stringify(params),
    },
    userId,
  });
  const rbody: UpdateEnabledSitesResponse = await res.json();
  return { ...rbody, status: res.status };
};
