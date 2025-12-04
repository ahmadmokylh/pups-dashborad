export const dynamic = 'force-dynamic';

import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Banknote, Weight } from 'lucide-react';
import Image from 'next/image';
import ProductSkeleton from './product-skeleton';
import { ProductType } from '@/types/productType';
import { Button } from './ui/button';
import Link from 'next/link';
import { DeleteButton } from './delete-botton';

// shadcn pagination
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

export default function ProductCard({
  products,
  page,
  totalPages,
  isLoading,
}: {
  products: ProductType[];
  page: number;
  totalPages: number;
  isLoading: boolean;
}) {
  return (
    <div className="flex-1 min-w-0">
      <div className="space-y-12">
        {/* ---------------- Skeleton ---------------- */}
        {isLoading &&
          Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)}

        {/* ---------------- REAL DATA ---------------- */}
        {!isLoading &&
          products.map((product: ProductType) => (
            <Card
              key={product._id}
              className="flex flex-col sm:flex-row shadow-none overflow-hidden rounded-md border-none py-0"
            >
              {/* الصورة */}
              <div className="w-full sm:w-56 h-40 sm:h-56 bg-muted rounded-lg shrink-0 relative">
                <Image
                  alt={product.name}
                  src={product.img}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>

              {/* المحتوى */}
              <CardContent className="px-0 sm:px-6 py-0 flex flex-col justify-between flex-1 2xl:min-w-[600px] max-w-full overflow-hidden">
                <div>
                  <div className="flex items-center gap-6">
                    <Badge className="bg-amber-200/70 text-primary hover:bg-primary/5 shadow-none">
                      {product.category}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    {product.offer && (
                      <span className="mt-4 text-sm text-white bg-[#ED1414] px-2 py-0.5 rounded-md">
                        {product.offer}
                      </span>
                    )}
                    <h3 className="mt-4 text-xl font-semibold tracking-tight">
                      {product.name}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground line-clamp-3 max-w-[340px] xl:max-w-full text-end">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4" /> د.ك. {product.price}
                    {product.oldPrice && (
                      <span className="line-through">
                        د.ك. {product.oldPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Weight className="h-4 w-4" /> {product.weight} جرام
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/products/${product.slug}`}>عرض المنتج</Link>
                  </Button>

                  <DeleteButton id={product._id}>حذف</DeleteButton>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* ---------------- PAGINATION ---------------- */}
      {!isLoading && totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href={`?page=${page > 1 ? page - 1 : 1}`} />
              </PaginationItem>

              {/* ---------- SMART PAGINATION ---------- */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  if (p === 1 || p === totalPages) return true;
                  if (p >= page - 1 && p <= page + 1) return true;
                  if (p <= 3) return true;
                  return false;
                })
                .map((p, idx, arr) => {
                  const isGap = idx > 0 && arr[idx - 1] !== p - 1;

                  return (
                    <PaginationItem key={p}>
                      {isGap && (
                        <PaginationLink href="#" isActive={false}>
                          ...
                        </PaginationLink>
                      )}

                      <PaginationLink href={`?page=${p}`} isActive={p === page}>
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

              <PaginationItem>
                <PaginationNext
                  href={`?page=${page < totalPages ? page + 1 : totalPages}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
