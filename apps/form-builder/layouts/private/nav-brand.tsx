import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { BRAND_LOGO, BRAND_NAME } from '@/constants/branding';
import { PRIVATE_ROUTES } from '@/constants/routes';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/core-ui/components/sidebar';

const NavBrand = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href={PRIVATE_ROUTES.home}>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Image
                src={BRAND_LOGO}
                alt={BRAND_NAME}
                width={48}
                height={48}
                priority
                className="rounded-md"
              />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-display text-lg font-medium">
                {BRAND_NAME}
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavBrand;
