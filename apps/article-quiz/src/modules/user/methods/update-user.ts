import { updateUser as _updateUser } from '@article-quiz/db';
import { UserInfo } from '@article-quiz/shared-types';

type Input = {
  id: string;
} & Partial<UserInfo>;

export const updateUser = async ({ id, enabledSites }: Input) => {
  await _updateUser({ id, enabledSites });
};
