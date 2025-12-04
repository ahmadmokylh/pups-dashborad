export type CategorySummaryItem = {
  category: string;
  count: number;
};

export type CategorySummaryResponse = {
  total: number;
  categorys: CategorySummaryItem[];
};
