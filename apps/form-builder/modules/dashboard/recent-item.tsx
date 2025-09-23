import { FileTextIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import {
  type AllowedLocales,
  type SupportedFormatStrings,
  format,
  formatStrings,
} from '@repo/core-ui/lib/day';

import { type IForm } from '@repo/form-ui/types/form';

import FormContextMenu from '@/components/form-context-menu';

import { Card, CardContent } from '@repo/core-ui/components/card';

interface RecentItemProps {
  form: IForm;
  onDelete: (form: IForm) => void;
}

const RecentItem = ({ form, onDelete }: RecentItemProps) => {
  const router = useRouter();
  const locale = useLocale();

  const handleDeleteForm = (form: IForm) => {
    onDelete(form);
  };

  const handleEditForm = (form: IForm) => {
    router.push(PRIVATE_ROUTES.forms.edit.replace('[id]', form.id));
  };

  const handleDuplicateForm = (form: IForm) => {
    console.log(form);
  };

  const handleSelectForm = (form: IForm) => {
    router.push(PRIVATE_ROUTES.forms.preview.replace('[id]', form.id));
  };

  const formatDate = (dateString: number) => {
    return format(
      new Date(dateString),
      formatStrings[locale as AllowedLocales].default as SupportedFormatStrings,
      locale as AllowedLocales
    );
  };

  return (
    <Card
      key={form.id}
      className="group cursor-pointer transition-shadow hover:shadow-md"
      onClick={() => handleSelectForm(form)}
    >
      <CardContent className="p-4">
        <div className="mb-3 flex items-start justify-between">
          <FileTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <FormContextMenu
            form={form}
            onSelect={handleSelectForm}
            onEdit={handleEditForm}
            onDuplicate={handleDuplicateForm}
            onDelete={handleDeleteForm}
          />
        </div>
        <h4 className="mb-1 truncate font-serif font-medium text-gray-900 dark:text-gray-100">
          {form.title}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {formatDate(form.updatedAt)}
        </p>
      </CardContent>
    </Card>
  );
};

export default RecentItem;
