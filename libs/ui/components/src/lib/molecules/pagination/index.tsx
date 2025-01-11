import React, { ComponentPropsWithoutRef, FC } from 'react';
import {
  Pagination as RawPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../shadcn/pagination';
import { cn } from '@article-quiz/ui-utils';

type Props = ComponentPropsWithoutRef<typeof RawPagination> & {
  className?: string;
  previousHref?: string;
  nextHref?: string;
  items: (
    | {
        type: 'page';
        href?: string;
        isActive?: boolean;
        page: number;
      }
    | {
        type: 'ellipsis';
      }
  )[];
};

export const Pagination: FC<Props> = ({
  className,
  items,
  previousHref,
  nextHref,
  ...props
}) => {
  return (
    <>
      <RawPagination className={cn(className)} {...props}>
        <PaginationContent>
          {previousHref && (
            <PaginationItem>
              <PaginationPrevious href={previousHref} />
            </PaginationItem>
          )}
          {items.map((it, index) => (
            <>
              <PaginationItem
                key={
                  it.type === 'page' ? it.href ?? it.page : index + 'ellipsis'
                }
              >
                {it.type === 'page' && (
                  <PaginationLink href={it.href} isActive={it.isActive}>
                    {it.page}
                  </PaginationLink>
                )}
                {it.type === 'ellipsis' && <PaginationEllipsis />}
              </PaginationItem>
            </>
          ))}
          {nextHref && (
            <PaginationItem>
              <PaginationNext href={nextHref} />
            </PaginationItem>
          )}
        </PaginationContent>
      </RawPagination>
    </>
  );
};
