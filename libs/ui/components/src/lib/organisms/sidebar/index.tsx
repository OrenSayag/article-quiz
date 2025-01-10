import React, { ComponentProps, FC } from 'react';
import { cn } from '@article-quiz/ui-utils';
import {
  Sidebar as RawSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '../../shadcn/sidebar';
import { NotebookText, User } from 'lucide-react';
import Link from 'next/link';
import { Session } from 'next-auth';
import { ProfilePic } from '../../molecules/profile-pic';

type Props = ComponentProps<typeof RawSidebar> & {
  className?: string;
  session: Session;
};

const items = [
  {
    title: 'Profile',
    url: '/dashboard/profile',
    icon: User,
  },
  {
    title: 'History',
    url: '/dashboard/history',
    icon: NotebookText,
  },
];

export const Sidebar: FC<Props> = ({ className, session, ...props }) => {
  return (
    <>
      <RawSidebar collapsible={'icon'} className={cn(className)} {...props}>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Article Quiz</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <ProfilePic
            name={session.user?.name ?? undefined}
            url={session.user?.image ?? undefined}
          />
        </SidebarFooter>
      </RawSidebar>
    </>
  );
};

export { SidebarProvider };
