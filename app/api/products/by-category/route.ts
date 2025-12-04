import { NextResponse } from 'next/server';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/DB';

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.getAll('category');

    if (!category)
      return NextResponse.json(
        { error: 'You must provide category' },
        { status: 400 }
      );

    const products = await Product.find({
      category: { $in: category },
    });
    return NextResponse.json(
      {
        total: products.length,
        category,
        products,
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, ',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch products', details: err },
      { status: 500 }
    );
  }
}
