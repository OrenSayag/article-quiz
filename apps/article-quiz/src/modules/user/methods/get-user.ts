import { UserInfo } from '@article-quiz/shared-types';
import { getUser as _getUser } from '@article-quiz/db';

type Input = {
  id: string;
};

type Output = UserInfo;

export const getUser = ({ id }: Input): Promise<Output> => {
  return _getUser({ id });
};
