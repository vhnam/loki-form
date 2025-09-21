'use client';

import { useRouter } from 'next/navigation';
import { type PropsWithChildren } from 'react';

import { PUBLIC_ROUTES } from '@/constants/routes';

import { useClientOnly } from '@repo/core-ui/hooks/use-client-only';

import { useAuthStore } from '@/stores/auth';

import {
  SidebarInset,
  SidebarProvider,
} from '@repo/core-ui/components/sidebar';

import AppSidebar from './app-sidebar';

const PrivateLayout = ({ children }: PropsWithChildren) => {
  const hasMounted = useClientOnly();
  const router = useRouter();
  const { user } = useAuthStore();

  if (hasMounted && !user) {
    router.push(PUBLIC_ROUTES.auth.signIn);
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};

export default PrivateLayout;
