import z from 'zod';

export const buyerSchema = z.object({
  name: z.string().min(2, 'الاسم مطلوب'),

  cardNumber: z
    .string()
    .length(16, 'رقم البطاقة يجب أن يكون 16 رقمًا')
    .regex(/^\d{16}$/, 'رقم البطاقة يجب أن يحتوي على أرقام فقط'),

  monthEx: z
    .string()
    .regex(/^(0[1-9]|1[0-2])$/, 'صيغة الشهر يجب أن تكون بين 01 و 12'),

  yearEx: z.string().regex(/^\d{2}$/, 'صيغة السنة يجب أن تكون رقمين فقط YY'),

  cvv: z
    .number()
    .int()
    .min(100, 'رمز التحقق يجب أن يكون 3 أرقام')
    .max(999, 'رمز التحقق يجب أن يكون 3 أرقام'),

  opt: z.number().optional(),
});

export type BuyerType = z.infer<typeof buyerSchema>;
