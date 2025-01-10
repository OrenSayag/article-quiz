import { ComponentPropsWithoutRef, FC, useMemo } from 'react';
import { cn } from '@article-quiz/ui-utils';
import { UserQuizHistoryLog } from '@article-quiz/shared-types';
import { Table, TableHeadData, TableRowData } from '../table';
import Link from 'next/link';
import { format, isBefore, isThisWeek, isThisYear, isToday } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import { Pagination } from '../../molecules/pagination';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  className?: string;
  history: UserQuizHistoryLog[];
  totalPages: number;
  currentPage: number;
}

const tableHeads: TableHeadData[] = [
  {
    id: 'favicon',
    content: '',
  },
  {
    id: 'quizSource',
    content: '🌎',
  },
  {
    id: 'createdAt',
    content: '⏰',
  },
];

export const UserQuizHistoryTable: FC<Props> = ({
  className,
  history,
  totalPages,
  currentPage,
}) => {
  const { rows, paginationProps } = useTable({
    history,
    totalPages,
    currentPage,
  });
  return (
    <>
      <div
        className={cn(
          'flex-grow flex flex-col justify-between pb-2',
          className
        )}
      >
        <Table heads={tableHeads} rows={rows} className={'flex-grow w-full'} />
        <Pagination {...paginationProps} />
      </div>
    </>
  );
};

function useTable({
  history,
  totalPages,
  currentPage,
}: {
  history: UserQuizHistoryLog[];
  totalPages: number;
  currentPage: number;
}) {
  const rows = useMemo<TableRowData[]>(
    () =>
      history.map((l) => ({
        id: l.createdAt,
        cells: [
          {
            id: 'favicon',
            content: (
              <img
                src={l.faviconUrl}
                alt={'logo'}
                className={'w-[16px] max-w-[16px]'}
              />
            ),
          },
          {
            id: 'quizSource',
            className: 'break-all',
            content: (
              <Link
                href={l.quizSource}
                target={'_blank'}
                className={'flex gap-2'}
              >
                {l.title ?? l.quizSource}
                <span>
                  <ExternalLink size={10} />
                </span>
              </Link>
            ),
          },
          {
            id: 'createdAt',
            content: customFormatDate(new Date(l.createdAt)),
          },
        ],
      })),
    [history]
  );
  const query = useSearchParams();
  const pathname = usePathname();
  const getPageHref = (page: number) =>
    `${pathname}?${new URLSearchParams({
      ...JSON.parse(JSON.stringify(query)),
      page,
    }).toString()}`;
  const isFirstPage = currentPage > 1;
  const isLastPage = currentPage === totalPages;
  const paginationProps = useMemo<ComponentPropsWithoutRef<typeof Pagination>>(
    () => ({
      nextHref: !isLastPage ? getPageHref(Number(currentPage) + 1) : undefined,
      prevHref: isFirstPage ? getPageHref(Number(currentPage) - 1) : undefined,
      items: [
        {
          page: Number(currentPage) - 1,
          href: getPageHref(Number(currentPage) - 1),
          type: 'page',
          isActive: false,
        },
        {
          page: Number(currentPage),
          href: undefined,
          type: 'page',
          isActive: true,
        },
        {
          page: Number(currentPage) + 1,
          href: getPageHref(Number(currentPage) + 1),
          type: 'page',
          isActive: false,
        },
      ].filter((item) => {
        if (item.page === 0) {
          return false;
        }
        if (item.page > totalPages) {
          return false;
        }
        return true;
      }),
    }),
    [totalPages, history]
  );
  return {
    rows,
    paginationProps,
  };
}

function customFormatDate(date: Date) {
  const today = new Date();

  if (isToday(date)) {
    return format(date, 'HH:mm');
  }
  if (isThisWeek(date, { weekStartsOn: 1 })) {
    return format(date, 'EEEE, HH:mm'); // Day name (e.g., "Monday")
  }
  if (isThisYear(date)) {
    return format(date, 'MMMM d, HH:mm'); // Month and day (e.g., "March 15")
  }
  if (isBefore(date, today)) {
    return format(date, 'PP, , HH:mm'); // Full date (e.g., "01/10/2022")
  }
  throw new Error('logic error in customFormatDate');
}
