'use client';

import { LoginTemplate, LoginType } from '@article-quiz/components';
import { signIn } from 'next-auth/react';

export default function LoginPage({
  searchParams,
}: {
  searchParams: {
    [k: string]: string;
  };
}) {
  const urlSearchParams = new URLSearchParams(searchParams);
  return (
    <LoginTemplate
      onLogin={() =>
        signIn('google', {
          callbackUrl: `/dashboard/profile?${urlSearchParams.toString()}`,
        })
      }
      type={LoginType.SIGN_IN}
    />
  );
}
