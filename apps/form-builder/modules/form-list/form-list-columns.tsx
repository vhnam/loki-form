import { type CellContext } from '@tanstack/react-table';
import { useLocale, useTranslations } from 'next-intl';
import React, { type ReactNode, useMemo } from 'react';

import {
  type AllowedLocales,
  type SupportedFormatStrings,
  format,
  formatStrings,
} from '@repo/core-ui/lib/day';

import { type IForm } from '@repo/form-ui/types/form';

import FormContextMenu from '@/components/form-context-menu';

import { Badge } from '@repo/core-ui/components/badge';

interface FormHandlers {
  handleEditForm: (form: IForm) => void;
  handleDuplicateForm: (form: IForm) => void;
  handleSelectForm: (form: IForm) => void;
  handleDeleteForm: (form: IForm) => void;
}

interface UseFormListColumnsProps {
  handlers: FormHandlers;
  getFieldsCount: (form: IForm) => number;
}

export const useFormListColumns = ({
  handlers,
  getFieldsCount,
}: UseFormListColumnsProps) => {
  const t = useTranslations('formListPage');
  const locale = useLocale();

  const {
    handleEditForm,
    handleDuplicateForm,
    handleSelectForm,
    handleDeleteForm,
  } = handlers;

  return useMemo(
    () => [
      {
        id: 'form',
        header: t('columns.form'),
        cell: ({ row }: CellContext<IForm, ReactNode>) => (
          <>
            <span className="block truncate font-medium">
              {row.original.title}
            </span>
            <span className="text-muted-foreground block truncate text-sm">
              {row.original.description}
            </span>
          </>
        ),
      },
      {
        id: 'statistics',
        header: t('columns.statistics'),
        cell: ({ row }: CellContext<IForm, ReactNode>) => (
          <>
            <Badge variant="secondary" className="mx-1">
              {t('cell.sections', {
                count: row.original.sections?.length ?? 0,
              })}
            </Badge>
            <Badge variant="secondary" className="mx-1">
              {t('cell.questions', {
                count: getFieldsCount(row.original) ?? 0,
              })}
            </Badge>
          </>
        ),
      },
      {
        id: 'createdAt',
        header: (
          <span className="flex items-center justify-end">
            {t('columns.createdAt')}
          </span>
        ),
        cell: ({ row }: CellContext<IForm, ReactNode>) => {
          const date = new Date(row.original.createdAt);
          return (
            <div className="w-full text-right text-sm">
              {format(
                date,
                formatStrings[locale as AllowedLocales]
                  .default as SupportedFormatStrings,
                locale as AllowedLocales
              )}
            </div>
          );
        },
      },
      {
        id: 'actions',
        header: (
          <span className="flex items-center justify-end">
            {t('columns.actions')}
          </span>
        ),
        cell: ({ row }: CellContext<IForm, ReactNode>) => (
          <div className="flex items-center justify-end">
            <FormContextMenu
              form={row.original}
              onSelect={handleSelectForm}
              onEdit={handleEditForm}
              onDuplicate={handleDuplicateForm}
              onDelete={handleDeleteForm}
            />
          </div>
        ),
      },
    ],
    [
      handleEditForm,
      handleDuplicateForm,
      handleDeleteForm,
      handleSelectForm,
      getFieldsCount,
      t,
      locale,
    ]
  );
};
