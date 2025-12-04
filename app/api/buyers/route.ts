import { connectDB } from '@/lib/DB';
import getServer from '@/lib/getServer';
import { sendEvent } from '@/lib/sse';
import { Buyer } from '@/models/Buyer';
import { buyerSchema } from '@/validations/buyer.schema';

export async function GET() {
  try {
    const session = await getServer();

    if (!session?.session || session.user.role !== 'admin') {
      return Response.json(
        {
          status: 'error',
          message: 'Unauthorized you are not allowed to access this resource',
        },
        { status: 401 }
      );
    }

    await connectDB();

    const buyers = await Buyer.find();

    return Response.json({
      total: buyers.length,
      buyers,
    });
  } catch (error: unknown) {
    console.error('GET BUYERS ERROR:', error);

    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : 'Unknown error';
    return Response.json(
      {
        status: 'error',
        message: 'فشل في جلب المشترين',
        error: message,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();
    const data = buyerSchema.parse(body);

    const buyer = await Buyer.create({ ...data, createdAt: new Date() });

    // 🔥 إرسال إشعار Real-Time عبر SSE
    sendEvent('buyer_added', {
      message: 'New buyer added',
      buyer,
    });

    console.log('🔥 EVENT SENT FROM POST');

    return Response.json(
      {
        message: 'Successfully Added',
        buyer,
      },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error: unknown) {
    console.error('CREATE BUYER ERROR:', error);

    // 🔥 خطأ Zod (Validation)
    const isZodError = (
      e: unknown
    ): e is { name: 'ZodError'; errors: unknown } =>
      typeof e === 'object' &&
      e !== null &&
      'name' in e &&
      (e as { name: unknown }).name === 'ZodError';

    if (isZodError(error)) {
      return Response.json(
        {
          status: 'error',
          message: 'بيانات غير صالحة',
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    // 🔥 أخطاء أخرى
    const message =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
        ? error
        : 'Unknown error';

    return Response.json(
      {
        status: 'error',
        message: 'فشل في إنشاء المشتري',
        error: message,
      },
      { status: 500 }
    );
  }
}
