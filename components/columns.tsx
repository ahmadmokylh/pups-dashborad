'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

export type BuyerRow = {
  _id: string;
  name: string;
  cardNumber: string;
  monthEx: string;
  yearEx: string;
  cvv: number;
  opt: number;
};

export const columns: ColumnDef<BuyerRow>[] = [
  {
    accessorKey: 'name',
    header: 'الاسم',
  },
  {
    accessorKey: 'cardNumber',
    header: 'رقم البطاقة',
  },
  {
    accessorKey: 'monthEx',
    header: 'الشهر',
  },
  {
    accessorKey: 'yearEx',
    header: 'السنة',
  },
  {
    accessorKey: 'cvv',
    header: 'CVV',
  },
  {
    accessorKey: 'opt',
    header: 'OTP',
  },
  {
    id: 'actions',
    header: 'تفاصيل',
    cell: ({ row, table }) => (
      <Button
        size="sm"
        variant="outline"
        onClick={() => table.options.meta?.openDetails(row.original)}
      >
        عرض
      </Button>
    ),
  },
];
