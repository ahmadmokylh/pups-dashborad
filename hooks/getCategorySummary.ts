import { CategorySummaryResponse } from '@/types/categoryiesType';

export default async function getCategorySummary(): Promise<CategorySummaryResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_PRODUCTS_CATEGORIES_SUMMARY_URL}`,
    { cache: 'no-store' }
  );

  const data = await res.json();

  return data;
}
