'use client';

import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import { toast } from 'sonner';

import { useGetProfileQuery } from '@/services/auth';

import { ErrorBoundary } from '@/components/error-boundary';
import { Spinner } from '@/components/spinner';

import { Button } from '@repo/core-ui/components/button';

import { PrivateLayoutHeader } from '@/layouts/private';

import Profile, { type ProfileFormRef } from '@/modules/profile';

const ProfilePage = () => {
  const profileFormRef = useRef<ProfileFormRef>(null);
  const t = useTranslations('profilePage');
  const { data, isPending } = useGetProfileQuery();

  const handleSave = () => {
    profileFormRef.current?.submit();
  };

  return (
    <ErrorBoundary
      onError={() => {
        toast.error(t('actions.get.error'));
      }}
    >
      <PrivateLayoutHeader
        title={t('header.title')}
        actions={
          <Button
            variant="default"
            onClick={handleSave}
            disabled={profileFormRef.current?.isSubmitting}
          >
            {profileFormRef.current?.isSubmitting
              ? t('header.actions.saving')
              : t('header.actions.save')}
          </Button>
        }
      />
      {isPending ? <Spinner /> : <Profile ref={profileFormRef} user={data} />}
    </ErrorBoundary>
  );
};

export default ProfilePage;
