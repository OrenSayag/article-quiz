'use client';

import React, { FC } from 'react';
import { cn } from '@article-quiz/ui-utils';
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
      </nav>
    </>
  );
};

function Title() {
  return <h3>Article Quiz</h3>;
}
