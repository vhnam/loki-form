import {
  CopyIcon,
  Edit3Icon,
  EyeIcon,
  MoreHorizontalIcon,
  Trash2Icon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { type MouseEvent } from 'react';

import { type IForm } from '@repo/form-ui/types/form';

import { Button } from '@repo/core-ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/core-ui/components/dropdown-menu';

interface FormContextMenuProps {
  form: IForm;
  onSelect?: (form: IForm) => void;
  onEdit: (form: IForm) => void;
  onDuplicate: (form: IForm) => void;
  onDelete: (form: IForm) => void;
}

const FormContextMenu = ({
  form,
  onSelect,
  onEdit,
  onDuplicate,
  onDelete,
}: FormContextMenuProps) => {
  const t = useTranslations('formContextMenu');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onSelect && (
          <DropdownMenuItem
            onClick={(e: MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              onSelect(form);
            }}
          >
            <EyeIcon className="mr-2 size-4" />
            {t('preview')}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onEdit(form);
          }}
        >
          <Edit3Icon className="mr-2 size-4" />
          {t('edit')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onDuplicate(form);
          }}
        >
          <CopyIcon className="mr-2 size-4" />
          {t('duplicate')}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            onDelete(form);
          }}
          className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
        >
          <Trash2Icon className="mr-2 size-4" />
          {t('delete')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FormContextMenu;
