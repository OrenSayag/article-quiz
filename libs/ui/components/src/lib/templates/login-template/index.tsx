import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../shadcn/card';
import {
  SocialProvider,
  SocialProviderLoginButton,
} from '../../atoms/social-provider-login-button';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../../assets/icons/icon.png';

export enum LoginType {
  SIGN_IN = 'sign-in',
  SIGN_UP = 'sign-up',
}

type Props = {
  onLogin(provider: string): void;
  type: LoginType;
};

const titlesMap: Record<
  LoginType,
  { title: string; oppositeHref: string; toOppositeTitle: string }
> = {
  [LoginType.SIGN_IN]: {
    title: 'Sign in',
    oppositeHref: '/auth/sign-up',
    toOppositeTitle: "I don't have an account",
  },
  [LoginType.SIGN_UP]: {
    title: 'Sign up',
    oppositeHref: '/auth/login',
    toOppositeTitle: 'I have an account',
  },
};

export const LoginTemplate: FC<Props> = ({ onLogin, type }) => {
  return (
    <div className={'pt-12'}>
      <div>
        <Image src={Logo} alt={'logo'} className={'mx-auto w-24'} />
      </div>
      <Card className={'max-w-[500px] mx-auto mt-10'}>
        <CardHeader>
          <div className={'flex justify-between items-center'}>
            <CardTitle>{titlesMap[type].title}</CardTitle>
            <Link href={titlesMap[type].oppositeHref} className={'underline'}>
              {titlesMap[type].toOppositeTitle}
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <SocialProviderLoginButton
            onClick={() => onLogin('google')}
            socialProvider={SocialProvider.GOOGLE}
            className={'w-full py-6'}
          >
            {titlesMap[type].title} with Google
          </SocialProviderLoginButton>
        </CardContent>
      </Card>
    </div>
  );
};
