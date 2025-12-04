import { Card, CardContent } from './ui/card';
import { Skeleton } from './ui/skeleton';

export default function ProductSkeleton() {
  return (
    <Card className="flex flex-col sm:flex-row shadow-none overflow-hidden rounded-md border-none py-0">
      {/* صورة سكليتون */}
      <div className="w-full sm:w-56 h-40 sm:h-56 rounded-lg shrink-0 relative">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>

      {/* المحتوى */}
      <CardContent className="px-0 sm:px-6 py-0 flex flex-col justify-between flex-1 xl:min-w-[700px] max-w-full">
        <div>
          <Skeleton className="h-6 w-32 rounded-md" />
          <Skeleton className="h-5 w-64 mt-4" />
        </div>

        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-3/4 mt-1" />
        <Skeleton className="h-4 w-1/2 mt-1" />

        <div className="mt-4 flex items-center gap-6">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}
