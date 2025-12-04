import { ProductsResponse } from '@/types/productType';

export default async function getAllProducts(
  page: number = 1,
  limit: number = 5
): Promise<ProductsResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_PRODUCTS_URL}?page=${page}&limit=${limit}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();

    return {
      products: data.products || [],
      total: data.total || 0,
      totalPages: data.totalPages || 1,
      currentPage: page,
    };
  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return {
      products: [],
      total: 0,
      totalPages: 1,
      currentPage: 1,
    };
  }
}
