import React, { FC } from 'react';
import { cn } from '@article-quiz/ui-utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../shadcn/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../../shadcn/avatar';
import { signOut } from 'next-auth/react';

interface Props {
  className?: string;
  url?: string;
  name?: string;
  dropDown?: boolean;
}

export const ProfilePic: FC<Props> = ({
  className,
  url,
  name,
  dropDown = true,
}) => {
  const fallbcakStr = name
    ?.split(' ')
    .map((str) => str[0])
    .join('');
  const avatar = (
    <Avatar className={cn('w-6 h-6 text-xs', className)}>
      <AvatarImage src={url} alt="avatar" />
      <AvatarFallback>{fallbcakStr ?? ''}</AvatarFallback>
    </Avatar>
  );
  return (
    <>
      {dropDown && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={'flex items-center justify-start ml-1'}
          >
            {avatar}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => signOut()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {!dropDown ? avatar : null}
    </>
  );
};
