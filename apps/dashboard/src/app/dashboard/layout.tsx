import { auth } from '../../auth';
import { redirect } from 'next/navigation';
import { Navbar } from '@article-quiz/components';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log({
    session,
  });
  if (!session) {
    redirect('/auth/login');
  }
  return (
    <div>
      <Navbar session={session} />
      {children}
    </div>
  );
}
