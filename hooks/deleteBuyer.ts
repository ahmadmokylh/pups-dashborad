'use server';
import { connectDB } from '@/lib/DB';
import { Buyer } from '@/models/Buyer';
import getServer from '@/lib/getServer';

export async function deleteBuyerAction(_id: string) {
  await connectDB();

  const session = await getServer();

  if (!session?.session || session.user.role !== 'admin') {
    throw new Error('Unauthorized: You are not allowed to delete buyers');
  }

  await Buyer.findByIdAndDelete(_id);

  return { success: true };
}
