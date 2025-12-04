import { DialogCard } from '@/components/dailog-card';
import DeleteBuyer from '@/components/delete-buyer';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BuyerType } from '@/hooks/getAllBuyers';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

export const Columns: ColumnDef<BuyerType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'cardNumber',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Card Number
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('cardNumber')}</div>
    ),
  },
  {
    accessorKey: 'ExDate',
    header: () => <div className="text-right">ExDate</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue('ExDate')}</div>
      );
    },
  },
  {
    accessorKey: 'cvv',
    header: () => <div className="text-right">CVV</div>,
    cell: ({ row }) => {
      const cvv = parseFloat(row.getValue('cvv'));
      return <div className="text-right font-medium">{cvv}</div>;
    },
  },
  {
    accessorKey: 'otp',
    header: () => <div className="text-right">OTP</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">{row.getValue('otp')}</div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.cardNumber)}
            >
              Copy
            </DropdownMenuItem>

            <DeleteBuyer id={row.original.id?.toString() ?? ''} />
            <DropdownMenuSeparator />

            <DialogCard
              name={row.getValue('name')}
              cardNumber={row.getValue('cardNumber')}
              ExDate={row.getValue('ExDate')}
              cvv={row.getValue('cvv')}
              otp={row.getValue('otp')}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
