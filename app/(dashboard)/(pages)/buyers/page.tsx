import DataBuyerTable from './components/data-table';
import { forbidden } from 'next/navigation';
import getServer from '@/lib/getServer';
import getAllBuyers from '@/hooks/getAllBuyers';

export default async function BuyersPage() {
  const session = await getServer();
  const role = session?.user.role;
  if (role !== 'admin') return forbidden();

  const { data } = await getAllBuyers(1, 10);

  return (
    <div>
      <DataBuyerTable data={data} />
    </div>
  );
}
