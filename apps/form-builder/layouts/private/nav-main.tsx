import { FileTextIcon, HomeIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react';

import { PRIVATE_ROUTES } from '@/constants/routes';

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/core-ui/components/sidebar';

const NavMain = () => {
  const pathname = usePathname();
  const t = useTranslations('sidebar');

  const items = useMemo(
    () => [
      {
        title: t('nav.home'),
        url: PRIVATE_ROUTES.home,
        icon: HomeIcon,
      },
      {
        title: t('nav.forms'),
        url: PRIVATE_ROUTES.forms.list,
        icon: FileTextIcon,
      },
    ],
    [t]
  );

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              tooltip={{
                children: item.title,
                hidden: false,
              }}
              isActive={pathname === item.url}
              className="px-2.5 md:px-2"
            >
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
