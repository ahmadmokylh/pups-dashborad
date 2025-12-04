import { connectDB } from '@/lib/DB';
import getServer from '@/lib/getServer';
import { sendEvent } from '@/lib/sse';
import { Buyer } from '@/models/Buyer';
import { otpSchema } from '@/validations/otp.schema';
import mongoose from 'mongoose';

export async function GET() {
  try {
    await connectDB();

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
    const { _id, otp } = await req.json();

    // 1) Validate OTP using Zod
    const parsed = otpSchema.safeParse({ otp });

    if (!parsed.success) {
      return Response.json(
        { message: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    // 2) Validate inputs exist
    if (!_id || !otp) {
      return Response.json(
        { message: 'buyer _id و otp مطلوبين' },
        { status: 400 }
      );
    }

    // 3) Validate MongoID
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return Response.json({ message: 'buyer _id غير صالح' }, { status: 400 });
    }

    // 4) Update Buyer with OTP
    const buyer = await Buyer.findByIdAndUpdate(_id, { otp }, { new: true });

    if (!buyer) {
      return Response.json({ message: 'Buyer غير موجود' }, { status: 404 });
    }

    sendEvent('otp_added', {
      message: 'تمت إضافة OTP جديد للمشتري',
      buyer,
    });

    return Response.json(
      {
        message: 'تمت إضافة OTP بنجاح',
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
  } catch (err) {
    console.error('ADD OTP ERROR:', err);
    return Response.json(
      { message: 'خطأ غير متوقع', error: err },
      { status: 500 }
    );
  }
}
