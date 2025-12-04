export const dynamic = 'force-dynamic';

import CategoriesItem from '@/components/categories-item';
import { EmptyProducts } from '@/components/empty-products';
import ProductCard from '@/components/product-card';
import getAllProducts from '@/hooks/getAllProducts';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function ProductsPage(props: {
  searchParams: SearchParams;
}) {
  const params = await props.searchParams;
  const page = Number(params.page ?? 1);
  const limit = 4;

  const { products, totalPages } = await getAllProducts(page, limit);

  const isEmpty = products.length === 0;

  if (isEmpty) {
    return (
      <div className="max-w-(--breakpoint-xl) mx-auto py-10 lg:py-23 px-6 xl:px-0 flex flex-col lg:flex-row gap-12 ">
        <EmptyProducts />
      </div>
    );
  }

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-row items-start gap-12">
      <div>
        {/* product card */}
        <ProductCard
          products={products}
          page={page}
          totalPages={totalPages}
          isLoading={false}
        />
      </div>
      {/* category side */}
      <CategoriesItem />
    </div>
  );
}
