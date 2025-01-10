'use client';

import { LoginTemplate, LoginType } from '@article-quiz/components';
import { signIn } from 'next-auth/react';
import { loginFromExtensionSearchParam } from '@article-quiz/shared-types';

export default function SignUpPage() {
  return (
    <LoginTemplate
      onLogin={() =>
        signIn('google', {
          callbackUrl: `/dashboard/profile?${loginFromExtensionSearchParam}=true`,
        })
      }
      type={LoginType.SIGN_UP}
    />
  );
}
