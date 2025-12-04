import { Folder } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import Link from 'next/link';

export function EmptyProducts() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Folder />
        </EmptyMedia>
        <EmptyTitle>لا توجد منتجات بعد</EmptyTitle>
        <EmptyDescription>ابدأ بإنشاء منتج جديد .</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>
            <Link href="/products/create">إنشاء منتج</Link>
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}
