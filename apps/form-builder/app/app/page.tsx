import { useTranslations } from 'next-intl';
import React from 'react';

import { PrivateLayoutHeader } from '@/layouts/private';

import Dashboard from '@/modules/dashboard';

const DashboardPage = () => {
  const t = useTranslations('dashboardPage');

  return (
    <>
      <PrivateLayoutHeader title={t('header.title')} />
      <Dashboard />
    </>
  );
};

export default DashboardPage;
