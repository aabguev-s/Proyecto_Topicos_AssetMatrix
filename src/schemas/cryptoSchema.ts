import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const getCoinParamsSchema = z.object({
  params: z.object({
    coin: z.string({ error: 'El id de la moneda es requerido' }).min(2).toLowerCase(),
  }),
});

export const gettx_idParamsSchema = z.object({
  params: z.object({
    tx_id: z.string({ error: 'El id de la transacción en la base de datos es requerido' }).regex(objectIdRegex, 'Formato de id inválido'),
  }),
})

export const createTransactionSchema = z.object({
  id: z.string({ error: 'Se requiere un ID válido' }).trim().toLowerCase(),
  transaction: z.object({
    current_price: z.number({ error: 'Precio actual debe ser un número' }),
    total_volume: z.number({ error: 'Volumen total debe ser un número' }),
    data_from: z.string({ error: 'La fecha de creación debe ser un string del formato yyyy-MM-dd' })
      .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, 'La fecha debe tener formato yyyy-MM-dd')
      .transform((s) => {
        const d = new Date(s);
        if (Number.isNaN(d.getTime())) throw new Error('Fecha inválida');
        return d;
      })
  }).optional()
})

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