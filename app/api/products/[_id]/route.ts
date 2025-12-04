import { connectDB } from '@/lib/DB';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';
import { UTApi } from 'uploadthing/server';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ _id: string }> }
) {
  try {
    await connectDB();

    const { _id } = await params;

    // 🔥 جلب المنتج
    const product = await Product.findById(_id);

    if (!product) {
      return NextResponse.json(
        { message: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'تم جلب المنتج بنجاح', product },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching product:', error);

    return NextResponse.json(
      {
        message: 'حدث خطأ أثناء جلب المنتج',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

const utapi = new UTApi();

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ _id: string }> }
) {
  try {
    await connectDB();

    const { _id } = await params;

    const product = await Product.findById(_id).select('img');

    if (!product) {
      return NextResponse.json(
        { message: 'المنتج غير موجود' },
        { status: 404 }
      );
    }

    // استخراج مفتاح UploadThing
    const fileUrl = product.img;
    const fileKey = fileUrl.split('/').pop();

    // ⬅️ UploadThing v6/v7 requires an array
    if (fileKey) {
      await utapi.deleteFiles([fileKey]);
    }

    // حذف المنتج
    const deletedProduct = await Product.findByIdAndDelete(_id);

    return NextResponse.json(
      {
        message: 'تم حذف المنتج والصورة بنجاح',
        product: deletedProduct,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('DELETE ERROR:', err);
    return NextResponse.json(
      { message: 'حدث خطأ أثناء الحذف' },
      { status: 500 }
    );
  }
}
