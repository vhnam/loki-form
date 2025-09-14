'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { sortBy, sumBy } from '@repo/core-ui/lib/lodash';

import type { IForm, ISection } from '@repo/form-ui/types/form';

import { useGetFormsQuery } from '@/services/forms';

import FormDeleteDialog from '@/components/form-delete-dialog';
import TablePagination from '@/components/table-pagination';

import { Button } from '@repo/core-ui/components/button';
import { Input } from '@repo/core-ui/components/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/core-ui/components/table';

import { PrivateLayoutHeader } from '@/layouts/private';

import { useFormListColumns } from './form-list-columns';
import { useFormListActions } from './form-list.actions';

const FormList = () => {
  const t = useTranslations('formListPage');

  const [page, setPage] = useState(1);

  const { data } = useGetFormsQuery({
    page,
    perPage: 10,
    sortBy: 'updatedAt',
    sortOrder: 'desc',
    query: '',
  });

  const fieldsCountMap = useMemo(() => {
    const map = new Map<string, number>();
    data?.data.forEach((form: IForm) => {
      map.set(
        form.id,
        sumBy(form.sections, (section: ISection) => section.fields.length)
      );
    });
    return map;
  }, [data]);

  const getFieldsCount = useCallback(
    (form: IForm) => fieldsCountMap.get(form.id) ?? 0,
    [fieldsCountMap]
  );

  const { handlers, deleteDialog } = useFormListActions();
  const columns = useFormListColumns({ handlers, getFieldsCount });

  const sortedData = useMemo(
    () => sortBy(data?.data ?? [], 'updatedAt').reverse(),
    [data]
  );

  const table = useReactTable<IForm>({
    data: sortedData,
    columns: columns as ColumnDef<IForm>[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <>
      <PrivateLayoutHeader
        title={t('header.title')}
        actions={
          <Link href={PRIVATE_ROUTES.forms.new}>
            <Button variant="default">{t('header.actions.new')}</Button>
          </Link>
        }
      />

      <div className="flex flex-1">
        <div className="flex-1 p-6">
          <div className="space-y-6">
            {/* TODO: add filter and sort for Input later */}
            <div className="flex items-center justify-between">
              <Input
                placeholder={t('filter.placeholder')}
                className="max-w-sm"
              />
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>

                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        {t('filter.noResults')}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
              <TablePagination
                table={table}
                totalPages={data?.pagination.totalPages ?? 0}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </div>

      <FormDeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={deleteDialog.closeDeleteFormDialog}
        onDeleteForm={deleteDialog.onDeleteForm}
      />
    </>
  );
};

export default FormList;
