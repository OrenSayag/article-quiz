import { UserInfo } from '@article-quiz/shared-types';
import { db, users } from '@article-quiz/db';
import { eq } from 'drizzle-orm';

type Input = {
  id: string;
} & Partial<UserInfo>;

export const updateUser = async ({ id, ...userInfo }: Input) => {
  await db
    .update(users)
    .set({
      ...userInfo,
    })
    .where(eq(users.id, id));
};
