'use client';

import { FC } from 'react';
import { cn } from '@article-quiz/ui-utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../shadcn/avatar';
import { Session } from 'next-auth';

interface Props {
  className?: string;
  session: Session;
}

export const Navbar: FC<Props> = ({ className, session }) => {
  return (
    <>
      <nav
        className={cn(
          'flex items-center justify-between px-4 py-4 border-b-2',
          className
        )}
      >
        <Title />
        <ProfilePic
          name={session.user?.name ?? undefined}
          url={session.user?.image ?? undefined}
        />
      </nav>
    </>
  );
};

function ProfilePic({ url, name }: { url?: string; name?: string }) {
  const fallbcakStr = name
    ?.split(' ')
    .map((str) => str[0])
    .join('');
  return (
    <Avatar>
      <AvatarImage src={url} alt="avatar" />
      <AvatarFallback>{fallbcakStr ?? ''}</AvatarFallback>
    </Avatar>
  );
}

function Title() {
  return <h3>Article Quiz</h3>;
}
