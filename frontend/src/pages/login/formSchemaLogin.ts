import { z } from 'zod';

export const schema = z.object({
  email: z.string().email('deve ser um email'),
  password: z.string().min(8),
});

export type LoginData = z.infer<typeof schema>;
