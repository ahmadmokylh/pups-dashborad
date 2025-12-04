'use client';

import { usePathname } from 'next/navigation';

export default function PageTitle() {
  const pathName = usePathname();

  if (pathName === '/') return 'Overiew';

  if (pathName) {
    const segments = pathName.split('/').filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    const format = (str: string) =>
      str.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    return <div className="text-xl">{format(lastSegment)}</div>;
  }

  return <div className="text-xl">{pathName}</div>;
}
