'use client';

import { FC } from 'react';
import { cn } from '@article-quiz/ui-utils';
import { UserQuizHistoryLog } from '@article-quiz/shared-types';
import { UserQuizHistoryTable } from '../../organisms/user-quiz-history-table';

interface Props {
  className?: string;
  history: UserQuizHistoryLog[];
  totalPages: number;
  currentPage: number;
}

export const HistoryTemplate: FC<Props> = ({
  className,
  history,
  currentPage,
  totalPages,
}) => {
  return (
    <>
      <div className={cn('h-[90vh] flex flex-col', className)}>
        <UserQuizHistoryTable
          history={history}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};
