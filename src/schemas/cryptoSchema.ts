//schemas/cryptoSchemas.ts

// @ts-nocheck
import { z } from 'zod';

// schemas/cryptoSchema.ts

export const getCoinParamsSchema = z.object({
  params: z.object({
    coin: z.string({ error: 'El id de la moneda es requerido' }).min(2).toLowerCase(),
  }),
});