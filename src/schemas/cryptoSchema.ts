import { z } from 'zod';

// Schema de prueba. Se ajustará al integrar las API externas.

const cryptoBodySchema = z.object({
  name: z.string({ error: 'Name is required' }).min(2),
  symbol: z.string({ error: 'Symbol is required' }).min(2).max(10),
  price: z.number({ error: 'Price must be a number' }).positive(),
  marketCap: z.number().positive().optional(),
});

const cryptoParamsSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId'),
});

export const createCryptoSchema = z.object({
  body: cryptoBodySchema
});

export const updateCryptoSchema = z.object({
  params: cryptoParamsSchema,
  body: cryptoBodySchema.partial()
});

export const getCryptoParamsSchema = z.object({
  params: cryptoParamsSchema
});

export type CreateCryptoInput = z.infer<typeof createCryptoSchema>;
export type UpdateCryptoInput = z.infer<typeof updateCryptoSchema>;