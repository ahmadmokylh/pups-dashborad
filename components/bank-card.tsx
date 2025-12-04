import {
  CreditCard,
  CreditCardBack,
  CreditCardCvv,
  CreditCardExpiry,
  CreditCardMagStripe,
  CreditCardName,
  CreditCardNumber,
} from '@/components/ui/shadcn-io/credit-card';
import { BankCardProps } from './dailog-card';
import { ClipboardButton } from './ui/clipboard-button';

export default function BankCard({
  name,
  cardNumber,
  ExDate,
  cvv,
  otp,
}: BankCardProps) {
  function formatCardNumber(num: string) {
    return num
      .replace(/\D/g, '') // إزالة أي شيء غير أرقام
      .replace(/(.{4})/g, '$1 ') // إضافة مسافة كل 4 أرقام
      .trim();
  }

  return (
    <CreditCard>
      <CreditCardBack className="bg-[#9EE672] text-black">
        <CreditCardMagStripe />
        <CreditCardNumber className="absolute bottom-0 left-0 flex items-center gap-2">
          {formatCardNumber(cardNumber)}

          <ClipboardButton value={cardNumber} label="رقم البطاقة" />
        </CreditCardNumber>
        {otp && (
          <div className="text-sm absolute top-18 gap-2 bg-black text-white p-1 flex items-center">
            OTP : {otp}
            <ClipboardButton value={otp?.toString()} label="رمز otp" />
          </div>
        )}
        <div className="absolute @xs:bottom-12 bottom-8 flex w-full @xs:flex-row flex-col @xs:justify-between gap-4">
          <CreditCardName className="flex-1">{name}</CreditCardName>
          <div className="flex flex-1 @xs:justify-between gap-4">
            <CreditCardExpiry>{ExDate}</CreditCardExpiry>
            <CreditCardCvv>{cvv}</CreditCardCvv>
          </div>
        </div>
      </CreditCardBack>
    </CreditCard>
  );
}
