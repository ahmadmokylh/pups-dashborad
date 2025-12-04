import z from 'zod';
import { passwordSchema } from './password.schema';

export const changePassSchema = z
  .object({
    currentPassword: z.string().min(1, 'الحقل مطلوب'),
    newPassword: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'كلمات المرور الجديدة غير متطابقة',
    path: ['confirmPassword'],
  });

export type ChangePassType = z.infer<typeof changePassSchema>;
