import { connectDB } from '@/lib/DB';
import { Product } from '@/models/Product';
import { productSchema } from '@/validations/product.schema';

// get all products fun
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);

  const skip = (page - 1) * limit;

  // 1) Count total documents
  const total = await Product.countDocuments();

  // 2) Fetch paginated products
  const products = await Product.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 }); // ترتيب تنازلي (اختياري)

  return Response.json(
    {
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://dashboard-pups.vercel.app',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const data = productSchema.parse(body);

    const product = await Product.create({
      ...data,
      createdAt: new Date(),
    });

    return Response.json(
      { status: 'success', product },
      { status: 201, headers: corsHeaders }
    );
  } catch (error: any) {
    console.error('CREATE PRODUCT ERROR:', error);

    // Validation Error
    if (error.name === 'ZodError') {
      return Response.json(
        {
          status: 'error',
          message: 'بيانات غير صالحة',
          errors: error.errors,
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Duplicate key (اسم المنتج موجود مسبقاً)
    if (error.code === 11000) {
      return Response.json(
        {
          status: 'error',
          message: 'هذا المنتج موجود مسبقًا',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // أي خطأ آخر
    return Response.json(
      {
        status: 'error',
        message: 'فشل في إنشاء المنتج',
        error: error.message,
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
