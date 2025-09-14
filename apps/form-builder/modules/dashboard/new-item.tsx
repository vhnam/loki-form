import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import React from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import { Card, CardContent } from '@repo/core-ui/components/card';

const NewItem = () => {
  const router = useRouter();
  const t = useTranslations('dashboardPage');

  const handleCreateNew = () => {
    router.push(PRIVATE_ROUTES.forms.new);
  };

  return (
    <Card
      className="group cursor-pointer transition-shadow hover:shadow-md"
      onClick={handleCreateNew}
    >
      <CardContent className="p-6 text-center">
        <PlusIcon className="mx-auto mb-3 h-12 w-12 text-gray-400 dark:text-gray-500" />
        <h4 className="font-medium text-gray-900 dark:text-gray-100">
          {t('newItem.title')}
        </h4>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          {t('newItem.description')}
        </p>
      </CardContent>
    </Card>
  );
};

export default NewItem;
