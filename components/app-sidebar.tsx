'use client';

import * as React from 'react';
import { Package, Users } from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { LogoMain } from './logo-main';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Products',
      url: '#',
      icon: Package,
      items: [
        {
          title: 'Product List',
          url: '/products',
        },
        {
          title: 'Add Product',
          url: '/products/create',
        },
      ],
    },
    {
      title: 'Buyers',
      url: '#',
      icon: Users,
      items: [
        {
          title: 'Buyer List',
          url: '/buyers',
        },
      ],
    },
    {
      title: 'Users',
      url: '#',
      icon: Users,
      items: [
        {
          title: 'User List',
          url: '/users',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <LogoMain />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
