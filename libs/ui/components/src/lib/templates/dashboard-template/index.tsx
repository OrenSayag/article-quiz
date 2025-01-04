'use client';

import { FC } from 'react';
import { cn } from '@article-quiz/ui-utils';
import { useLoggedInFromExtension } from '@article-quiz/next-services';
import { LoginFromExtensionSuccessfulModal } from '../../molecules/login-from-extension-successful';

interface Props {
  className?: string;
}

export const DashboardTemplate: FC<Props> = ({ className }) => {
  const { returnToExtensionModalActive, closeModal } =
    useLoggedInFromExtension();
  return (
    <>
      <div className={cn(className)}>Dashboard</div>
      {returnToExtensionModalActive && (
        <LoginFromExtensionSuccessfulModal onClose={closeModal} />
      )}
    </>
  );
};
