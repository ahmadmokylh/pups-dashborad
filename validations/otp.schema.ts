import z from 'zod';

export const otpSchema = z.object({
  otp: z.string().length(6, 'رمز التحقق يجب أن يكون 6 أرقام'),
});

export type OtpType = z.infer<typeof otpSchema>;
