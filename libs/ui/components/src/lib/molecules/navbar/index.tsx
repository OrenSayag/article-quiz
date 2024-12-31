'use client';

import React, { FC } from 'react';
import { cn } from '@article-quiz/ui-utils';
import { Avatar, AvatarFallback, AvatarImage } from '../../shadcn/avatar';
import { Session } from 'next-auth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../shadcn/dropdown-menu';
import { signOut } from 'next-auth/react';

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
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={url} alt="avatar" />
          <AvatarFallback>{fallbcakStr ?? ''}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Title() {
  return <h3>Article Quiz</h3>;
}
