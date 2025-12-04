'use client';

import { toast } from 'sonner';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { deleteBuyerAction } from '@/hooks/deleteBuyer';
import { useRouter } from 'next/navigation';

export default function DeleteBuyer({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteBuyerAction(id);
      toast.success('تم حذف المشتري بنجاح');
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error('فشل في الحذف: ' + message);
    }
  };

  return <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>;
}
