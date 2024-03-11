import { z } from 'zod';

export const schemaCont = z.object({
  email: z.string().email('deve ser um email'),
  name: z.string(),
  phone: z.string(),
});

export type ContactData = z.infer<typeof schemaCont>;
