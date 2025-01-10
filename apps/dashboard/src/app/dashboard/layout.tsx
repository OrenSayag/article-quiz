import { auth } from '../../auth';
import { redirect } from 'next/navigation';
import { SidebarLayout } from '../../layouts/sidebar-layout';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect('/auth/login');
  }
  return (
    <div>
      <SidebarLayout session={session}>{children}</SidebarLayout>
    </div>
  );
}
