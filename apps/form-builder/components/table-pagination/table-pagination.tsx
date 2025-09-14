import { Table } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import React, { type MouseEvent, useCallback } from 'react';

import { cn, getVisiblePages } from '@repo/core-ui/lib/utils';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@repo/core-ui/components/pagination';

interface TablePaginationProps<T> {
  table: Table<T>;
}

const TABLE_DISABLED_PAGINATION_ITEM_CLASSNAME =
  'text-muted-foreground pointer-events-none cursor-default hover:bg-transparent';

/**
 * The navigation is handled by the table state, not actual URL routing.
 */
const TablePagination = <T,>({ table }: TablePaginationProps<T>) => {
  const t = useTranslations('pagination');

  const handlePreviousPage = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      if (table.getCanPreviousPage()) {
        table.previousPage();
      }
    },
    [table]
  );

  const handleNextPage = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      if (table.getCanNextPage()) {
        table.nextPage();
      }
    },
    [table]
  );

  const handlePageClick = useCallback(
    (pageItem: number) => (e: MouseEvent<HTMLAnchorElement>) => {
      e.stopPropagation();
      table.setPageIndex(pageItem);
    },
    [table]
  );

  return (
    <Pagination className="justify-end">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            title={t('previous')}
            onClick={handlePreviousPage}
            className={cn({
              [TABLE_DISABLED_PAGINATION_ITEM_CLASSNAME]:
                !table.getCanPreviousPage(),
            })}
          />
        </PaginationItem>
        {getVisiblePages(
          table.getState().pagination.pageIndex,
          table.getPageCount()
        ).map((pageItem, index) => (
          <PaginationItem key={index}>
            {pageItem === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                onClick={handlePageClick(pageItem)}
                isActive={pageItem === table.getState().pagination.pageIndex}
              >
                {pageItem + 1}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            title={t('next')}
            onClick={handleNextPage}
            className={cn({
              [TABLE_DISABLED_PAGINATION_ITEM_CLASSNAME]:
                !table.getCanNextPage(),
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;
