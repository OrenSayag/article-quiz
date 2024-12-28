'use client';

import { LoginTemplate, LoginType } from '@article-quiz/components';
import { signIn } from 'next-auth/react';

export default function SignUpPage() {
  return (
    <LoginTemplate onLogin={() => signIn('google')} type={LoginType.SIGN_UP} />
  );
}
