'use client';

import { useEffect, useState } from 'react';

import { RowData } from '@tanstack/react-table';
import { BuyerRow, columns } from './columns';
import { DataTable } from './data-table';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    openDetails: (buyer: BuyerRow) => void;
  }
}

export default function BuyersTable() {
  const [data, setData] = useState<BuyerRow[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // async function fetchBuyers() {
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_BUYERS_URL}?page=${page}&limit=${limit}`
  //   );
  //   const json = await res.json();

  //   setData(json.buyers ?? []);
  //   setTotalPages(json.totalPages ?? 1);
  // }

  // useEffect(() => {
  //   async function load() {
  //     await fetchBuyers();
  //   }
  //   load();
  // }, [page]);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Buyers Cards</h1>

      <DataTable
        columns={columns}
        data={data}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}
