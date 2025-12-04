import { NextResponse } from 'next/server';
import { Product } from '@/models/Product';
import { connectDB } from '@/lib/DB';

export async function GET() {
  try {
    await connectDB();

    // 📌 التصنيفات الثابتة من الـ Schema (ممكن تخليها بملف constants)
    const categories = [
      'العروض',
      'العسل العضوي',
      'خلطات العسل',
      'منتجات الخلية',
      'منتجات المزرعة',
    ];

    // 📌 aggregation فعلي
    const summary = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          count: 1,
        },
      },
    ]);

    // 📌 نعمل MAP لكل التصنيفات ونشوف مين موجود ومين لا
    const finalSummary = categories.map((cat) => {
      const found = summary.find((item) => item.category === cat);
      return {
        category: cat,
        count: found ? found.count : 0, // إذا مش موجود نعطيه 0
      };
    });

    return NextResponse.json({
      total: finalSummary.concat.length,
      categorys: finalSummary,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Aggregation failed', details: err },
      { status: 500 }
    );
  }
}
