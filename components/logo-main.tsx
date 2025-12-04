'use client';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { GalleryVerticalEnd } from 'lucide-react';

import Link from 'next/link';

export function LogoMain() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="data-[slot=sidebar-menu-button]:p-1.5! "
        >
          <Link href="/">
            <GalleryVerticalEnd className="size-5!" />
            <span className="text-base font-semibold">Dashboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
