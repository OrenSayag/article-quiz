import { UserInfo } from '@article-quiz/shared-types';
import { db, users } from '@article-quiz/db';
import { eq } from 'drizzle-orm';
import { UnauthorizedException } from '@nestjs/common';

type Input = {
  id: string;
};

type Output = UserInfo;

export const getUser = async ({ id }: Input): Promise<Output> => {
  const res = await db.select().from(users).where(eq(users.id, id));
  const [user] = res;
  if (!user) {
    throw new UnauthorizedException();
  }
  return {
    name: user.name!,
    image: user.image ?? undefined,
    enabledSites: user.enabledSites ?? [],
  };
};
