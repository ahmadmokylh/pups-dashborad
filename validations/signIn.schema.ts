import z from 'zod';
import { passwordSchema } from './password.schema';

export const SignInSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: passwordSchema,
});

export type SignInType = z.infer<typeof SignInSchema>;
