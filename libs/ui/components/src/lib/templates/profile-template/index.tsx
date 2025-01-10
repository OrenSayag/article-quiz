import { FC } from 'react';
import { cn } from '@article-quiz/ui-utils';
import { ProfilePic } from '../../molecules/profile-pic';
import { Session } from 'next-auth';
import { H3 } from '../../atoms/typography/h3';

interface Props {
  className?: string;
  session: Session;
}

export const ProfileTemplate: FC<Props> = ({ className, session }) => {
  return (
    <>
      <div className={cn(className)}>
        <div className={'flex flex-col gap-3 items-center justify-center'}>
          <ProfilePic
            url={session.user!.image!}
            name={session.user!.name!}
            className={'w-10 h-10 mx-auto'}
            dropDown={false}
          />
          <H3>Hello, {session.user!.name!.split(' ')[0]}</H3>
        </div>
      </div>
    </>
  );
};
