// @ts-nocheck
import { z } from 'zod';

const transactionBodySchema = z.object({
  type: z.enum(['buy', 'sell'], { errorMap: () => ({ message: "Type must be 'buy' or 'sell'" }) }),
  amount: z.number({ error: 'Amount must be a number' }).positive(),
  priceAtTx: z.number({ error: 'PriceAtTx must be a number' }).positive(),
});

const cryptoBodySchema = z.object({
  name: z.string({ error: 'Name is required' }).min(2),
  symbol: z.string({ error: 'Symbol is required' }).min(2).max(10),
  price: z.number({ error: 'Price must be a number' }).positive(),
  marketCap: z.number().positive().optional(),
  transactions: z.array(transactionBodySchema).optional(),
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