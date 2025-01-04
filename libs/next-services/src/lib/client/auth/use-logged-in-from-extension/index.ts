import { useEffect, useState } from 'react';
import { notifyExtensionLoggedIn } from './methods/notify-extension-logged-in';
import { usePathname, useSearchParams } from 'next/navigation';
import { loginFromExtensionSearchParam } from '@article-quiz/shared-types';
import { useRouter } from 'next/navigation';

export const useLoggedInFromExtension = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [returnToExtensionModalActive, setReturnToExtensionModalActive] =
    useState(false);
  useEffect(() => {
    if (!searchParams.get(loginFromExtensionSearchParam)) {
      return;
    }
    notifyExtensionLoggedIn()
      .catch((err) => err)
      .then((res) => {
        console.log({ res });
        setReturnToExtensionModalActive(true);
      })
      .finally(() => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete(loginFromExtensionSearchParam);
        router.push(`${pathname}?${newSearchParams.toString()}`);
      });
  }, []);
  const closeModal = () => setReturnToExtensionModalActive(false);
  return {
    returnToExtensionModalActive,
    closeModal,
  };
};
