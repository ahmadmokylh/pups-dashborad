import z from 'zod';
import { passwordSchema } from './password.schema';

export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.email({ message: 'Invalid email address' }),
  password: passwordSchema,
});

export type SignUpType = z.infer<typeof signUpSchema>;
