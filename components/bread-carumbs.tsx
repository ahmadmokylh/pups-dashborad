'use client';

import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import React from 'react';

export default function BreadCarumbs() {
  const pathname = usePathname();

  // إزالة السلاش الأول + تقسيم
  const segments = pathname.split('/').filter(Boolean); // بنشيل الفراغات

  // دالة لعمل Capitalize
  const format = (str: string) =>
    str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem key={'/'}>
          {pathname === '/' ? (
            <BreadcrumbPage className="text-xl">Overview</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* باقي أجزاء المسار */}
        {segments.map((seg, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{format(seg)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{format(seg)}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
