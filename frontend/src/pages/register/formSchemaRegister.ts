import { z } from 'zod';

export const schemaReg = z.object({
  name: z.string(),
  email: z.string().email('deve ser um email'),
  password: z.string().min(8),
  phone: z.string(),
});

export type RegisterData = z.infer<typeof schemaReg>;
