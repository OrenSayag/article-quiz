import { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@article-quiz/ui-utils';
import { Button } from '@article-quiz/components';
import GoogleIcon from '../../../assets/icons/social/google.svg';
import Image from 'next/image';

export enum SocialProvider {
  GOOGLE = 'google',
}

const iconMap: Record<SocialProvider, string> = {
  [SocialProvider.GOOGLE]: GoogleIcon,
};

interface Props extends ComponentPropsWithoutRef<typeof Button> {
  className?: string;
  socialProvider: SocialProvider;
}

export const SocialProviderLoginButton: FC<Props> = ({
  className,
  socialProvider,
  children,
  ...props
}) => {
  return (
    <Button className={cn('p-4', className)} {...props}>
      <Image
        src={iconMap[socialProvider]}
        alt={socialProvider}
        className={'w-5'}
      />
      {children}
    </Button>
  );
};
