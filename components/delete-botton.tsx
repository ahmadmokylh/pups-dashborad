'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import deleteProduct from '@/hooks/deleteProduct';
import { useRouter } from 'next/navigation';
import React from 'react';

import { toast } from 'sonner';

interface DeleteProductProps {
  id: string;
  children: React.ReactNode;
  callback?: string | undefined;
}

export function DeleteButton({ id, children, callback }: DeleteProductProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      toast.success('تم حذف المنتج بنجاح');

      if (callback) {
        router.replace(`${callback}`);
        router.refresh();
      } else {
        router.refresh();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('حدث خطأ أثناء حذف المنتج');
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">{children}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>هل أنت متأكد من حذف هذا المنتج؟</DialogTitle>
          <DialogDescription>
            لا يمكنك استرجاع هذا المنتج بعد حذفه
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              إغلاق
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            تأكيد
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
