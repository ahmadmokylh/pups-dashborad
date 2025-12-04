export const dynamic = 'force-dynamic';

import BuyersTable from '@/components/buyer-table';
import { ProductCarousel } from '@/components/product-carousel';
import { TotalCard } from '@/components/total-card';
import getSummaryData from '@/hooks/getSummaryData';
import { Package, Users } from 'lucide-react';

export default async function Home() {
  const { totalProducts, totalBuyers } = await getSummaryData();

  const data = [
    {
      title: 'Total',
      name: 'Products',
      icon: Package,
      total: totalProducts,
    },
    {
      title: 'Total',
      name: 'Buyer',
      icon: Users,
      total: totalBuyers,
    },
  ];

  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        {data.map((d) => (
          <TotalCard
            title={d.title}
            name={d.name}
            icon={d.icon}
            total={d.total}
            key={d.name}
          />
        ))}
      </div>
      <div className=" min-h-screen flex-1  md:min-h-min">
        <div className="w-full flex flex-col lg:flex-row justify-between gap-6 ps-6  sm:pe-16 py-8 bg-muted/50 rounded-xl">
          <div className="text-2xl">Products</div>
          <div className="ps-6 w-full">
            {totalProducts > 0 && <ProductCarousel />}
          </div>
        </div>
        <BuyersTable />
      </div>
    </>
  );
}
