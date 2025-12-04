'use client';

import { SidebarTrigger } from './ui/sidebar';
import { Separator } from './ui/separator';
import PageTitle from './page-title';
import Userdropdown from './user-dropdown';
import { Button } from './ui/button';
import { usePathname, useRouter } from 'next/navigation';

export default function SidebarHeader() {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b">
      <div className="flex items-center justify-between w-full px-4">
        <div className="flex items-center gap-2 ">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />

          <PageTitle />
        </div>

        <div className="flex items-center gap-5 h-5">
          {pathName.includes('/products') && (
            <Button
              type="button"
              onClick={() => router.push('/products/create')}
            >
              Add Product
            </Button>
          )}

          <Separator orientation="vertical" />
          <Userdropdown />
        </div>
      </div>
    </header>
  );
}
