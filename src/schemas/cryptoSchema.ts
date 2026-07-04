//schemas/cryptoSchemas.ts

// @ts-nocheck
import { z } from 'zod';

// schemas/cryptoSchema.ts

export const getCoinParamsSchema = z.object({
  params: z.object({
    coin: z.string({ error: 'El id de la moneda es requerido' }).min(2).toLowerCase(),
  }),
});

const transactionBodySchema = z.object({
  _id: z.string().optional(),
  current_price: z.number({ error: 'Current price must be a number' }),
  total_volume: z.number({ error: 'Total volume must be a number' }),
  createdAt: z.string({ error: 'CreatedAt must be a string' })
});

const cryptoBodySchema = z.object({
  id: z.string({ error: 'Id is required' }),
  name: z.string({ error: 'Name is required' }).min(2),
  symbol: z.string({ error: 'Symbol is required' }).min(2).max(10),
  transactions: z.array(transactionBodySchema)
});

const cryptoParamsSchema = z.object({
  id: z.string({ error: 'Id must be a valid string' }),
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