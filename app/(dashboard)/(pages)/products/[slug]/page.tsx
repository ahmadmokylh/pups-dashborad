import Image from 'next/image';
import { SquarePen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { connectDB } from '@/lib/DB';
import { Product } from '@/models/Product';
import { DeleteButton } from '@/components/delete-botton';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  await connectDB();

  const data = await Product.findOne({ slug: slug });

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-8">
        <figure className="mx-auto shrink-0">
          <Image
            src={data.img}
            alt="..."
            width={800}
            height={600}
            className="w-full rounded-lg"
            unoptimized
          />
        </figure>

        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold md:text-3xl">{data.name}</h1>

            <div className="sm:flex sm:items-center sm:gap-4">
              {data.offer && (
                <span className="text-sm text-white bg-[#ED1414] px-2 py-0.5 rounded-md">
                  {data.offer}
                </span>
              )}

              <div className="flex gap-2">
                <span className="text-xl font-semibold sm:text-2xl">د.ك.</span>
                <p className="text-xl font-semibold sm:text-2xl">
                  {data.price}
                </p>
              </div>

              {data.oldPrice && (
                <div className="flex gap-2 line-through">
                  <span className="text-xl font-semibold sm:text-2xl">
                    د.ك.
                  </span>
                  <p className="text-xl font-semibold sm:text-2xl">
                    {data.oldPrice}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">{data.description}</p>

            <div className="flex flex-col gap-4">
              <h3>الوزن</h3>
              <div className="flex gap-4">
                {['1000', '500', '250'].map((w, i) => (
                  <Button key={i} variant="outline">
                    {w}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button>
              <SquarePen />
              تعديل
            </Button>
            <DeleteButton id={data._id.toString()} callback="/products">
              <Trash2 />
            </DeleteButton>
          </div>
        </div>
      </div>
    </div>
  );
}
