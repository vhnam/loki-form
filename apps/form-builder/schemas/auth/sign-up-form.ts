import { z } from 'zod';

export const signUpFormSchema = z.object({
  firstName: z.string().min(1).max(255),
  lastName: z.string().min(1).max(255),
  email: z.email().max(255),
  password: z.string().min(8),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
