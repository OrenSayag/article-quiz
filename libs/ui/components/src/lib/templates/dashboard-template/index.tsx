import { FC } from 'react';
import { cn } from '@article-quiz/ui-utils';

interface Props {
  className?: string;
}

export const DashboardTemplate: FC<Props> = ({ className }) => {
  return (
    <>
      <div className={cn(className)}>Dashboard</div>
    </>
  );
};
