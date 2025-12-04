export type ProductType = {
  _id: string;
  slug?: string;
  name: string;
  description: string;
  img: string;
  price: number;
  oldPrice?: number;
  offer?: string;
  weight?: string[];
  category: string;
};

export type ProductsResponse = {
  products: ProductType[];
  total: number;
  totalPages: number;
  currentPage: number;
};
