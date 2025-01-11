import { HistoryTemplate } from '@article-quiz/components';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';
import { getUserQuizHistory } from '@article-quiz/next-services/server';

export default async function HistoryPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const session = await auth();
  const { page } = await searchParams;
  if (!page || Number.isNaN(Number(page) || Number(page) < 1)) {
    redirect('/dashboard/history?page=1');
  }
  const { history, totalPages } = await getUserQuizHistory({
    userId: (session!.user as any).id,
    page: Number(page),
  });
  return (
    <HistoryTemplate
      history={history}
      totalPages={totalPages}
      currentPage={Number(page)}
    />
  );
}
