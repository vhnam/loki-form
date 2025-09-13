'use client';

import { BadgeCheckIcon, ChevronsUpDown, LogOutIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/constants/routes';

import { useClientOnly } from '@repo/core-ui/hooks/use-client-only';

import { User } from '@/types/user';

import { useLogoutMutation } from '@/services/auth';

import UserProfile from '@/components/user-profile';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/core-ui/components/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@repo/core-ui/components/sidebar';

interface NavUserProps {
  user: User;
}

const NavUser = ({ user }: NavUserProps) => {
  const router = useRouter();
  const hasMounted = useClientOnly();
  const { isMobile } = useSidebar();
  const { mutate: logout } = useLogoutMutation();
  const t = useTranslations('sidebar');

  const handleProfileClick = useCallback(() => {
    router.push(PRIVATE_ROUTES.profile);
  }, [router]);

  const handleLogoutClick = useCallback(
    () =>
      logout(undefined, {
        onSuccess: () => {
          toast.success(t('actions.logout.success'));
          router.push(PUBLIC_ROUTES.auth.signIn);
        },
      }),
    [logout, router, t]
  );

  if (!hasMounted) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <UserProfile user={user} />
            <ChevronsUpDown className="ml-auto size-4" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserProfile user={user} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <UserProfile user={user} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleProfileClick}>
                <BadgeCheckIcon />
                {t('user.profile')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogoutClick}>
              <LogOutIcon />
              {t('user.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavUser;
