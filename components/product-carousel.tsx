export const dynamic = 'force-dynamic';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import getAllProducts from '@/hooks/getAllProducts';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Image from 'next/image';

export async function ProductCarousel() {
  const items = Array.from({ length: 5 });

  const { products } = await getAllProducts(1, 4);

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full max-w-[300px] sm:max-w-7xl"
      /* على الموبايل يصير full width */
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem
            key={product._id}
            className=" md:basis-1/2 lg:basis-1/4"
          >
            <div className="p-1">
              {index === items.length - 1 ? (
                <div className="flex aspect-square items-center justify-center p-6">
                  <Link
                    href={'/products'}
                    className="text-2xl font-semibold underline"
                  >
                    view all
                  </Link>
                </div>
              ) : (
                <Card key={index} className="shadow-none py-0 gap-3">
                  <CardHeader className="p-2 pb-0">
                    <div className="aspect-video bg-muted rounded-lg w-full relative">
                      <Image
                        alt={product.name}
                        src={product.img}
                        fill
                        className=" rounded-lg object-cover"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-5 px-5">
                    <Badge variant="secondary">{product.category}</Badge>

                    <h3 className="mt-4 text-[1.4rem] font-semibold tracking-tight text-end">
                      {product.name}
                    </h3>
                    <div className="mt-6 flex items-center justify-between">
                      <Button variant="outline">
                        <Link href={`/products/${product.slug}`}>عرض</Link>
                      </Button>

                      <span className="text-muted-foreground text-sm">
                        د.ك. {product.price}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
