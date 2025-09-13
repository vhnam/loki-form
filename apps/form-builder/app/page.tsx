import { useTranslations } from 'next-intl';
import React from 'react';

const HomePage = () => {
  const t = useTranslations('homePage');

  return <div>{t('title')}</div>;
};

export default HomePage;
