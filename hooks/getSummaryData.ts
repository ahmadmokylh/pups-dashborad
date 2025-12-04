import { connectDB } from '@/lib/DB';
import { Buyer } from '@/models/Buyer';
import { Product } from '@/models/Product';

export default async function getSummaryData() {
  await connectDB();

  const totalProducts = await Product.countDocuments();
  const totalBuyers = await Buyer.countDocuments();

  return { totalBuyers, totalProducts };
}
