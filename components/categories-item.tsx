export const dynamic = 'force-dynamic';

import { CategorySummaryItem } from '@/types/categoryiesType';
import { Badge } from './ui/badge';
import getCategorySummary from '@/hooks/getCategorySummary';

export default async function CategoriesItem() {
  const { categorys, total } = await getCategorySummary();

  return (
    <aside className="sticky top-8 shrink-0 lg:max-w-sm w-full">
      <div className="flex gap-3 ">
        <span>({total}) </span>
        <h3 className="text-xl font-semibold tracking-tight">كل التصنيفات</h3>
      </div>
      <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
        {categorys.map((category: CategorySummaryItem, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-2 bg-muted p-3 rounded-md bg-opacity-15 dark:bg-opacity-25"
          >
            <div className="flex items-center gap-3">
              <span className="font-medium">{category.category}</span>
            </div>
            <Badge className="px-1.5 rounded-full bg-foreground/7 text-foreground">
              {category.count}
            </Badge>
          </div>
        ))}
      </div>
    </aside>
  );
}
