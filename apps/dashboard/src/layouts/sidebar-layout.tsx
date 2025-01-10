'use client';

import { FC, ReactNode } from 'react';
import { Session } from 'next-auth';
import {
  LoginFromExtensionSuccessfulModal,
  Sidebar,
  SidebarProvider,
} from '@article-quiz/components';
import { useLoggedInFromExtension } from '@article-quiz/next-services';

interface Props {
  session: Session;
  children: ReactNode;
}

export const SidebarLayout: FC<Props> = ({ session, children }) => {
  const { returnToExtensionModalActive, closeModal } =
    useLoggedInFromExtension();
  return (
    <>
      <SidebarProvider>
        <Sidebar session={session} />
        <main className={'w-full pt-12'}>{children}</main>
      </SidebarProvider>
      {returnToExtensionModalActive && (
        <LoginFromExtensionSuccessfulModal onClose={closeModal} />
      )}
    </>
  );
};
