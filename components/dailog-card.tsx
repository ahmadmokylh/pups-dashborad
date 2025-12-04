import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DropdownMenuItem } from './ui/dropdown-menu';
import BankCard from './bank-card';

export interface BankCardProps {
  name: string;
  cardNumber: string;
  ExDate: string;
  cvv: number;
  otp: string | null;
}

export function DialogCard({
  name,
  cardNumber,
  ExDate,
  cvv,
  otp,
}: BankCardProps) {
  return (
    <Dialog>
      <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
        <DialogTrigger>View Card</DialogTrigger>
      </DropdownMenuItem>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Card</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <BankCard
            name={name}
            cardNumber={cardNumber}
            ExDate={ExDate}
            cvv={cvv}
            otp={otp}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
