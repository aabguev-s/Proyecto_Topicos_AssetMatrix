import { z } from 'zod';

const stockSymbolSchema = z
  .string({ error: 'Symbol is required' })
  .min(1, 'Symbol cannot be empty')
  .transform((val) => val.toUpperCase());

// Define watch POST symbol schema directly so we can apply regex and transform
const watchStockSymbolSchema = z
  .string({ error: 'Symbol is required' })
  .min(1, 'Symbol cannot be empty')
  .regex(/^.+$/, { message: 'Symbol must be a non-empty string' })
  .transform((val) => val.toUpperCase());

export const stockSymbolParamsSchema = z.object({
  params: z.object({
    symbol: stockSymbolSchema,
  }),
});

export const watchStockSchema = z.object({
  body: z.object({
    symbol: watchStockSymbolSchema,
    companyName: z.string().min(1).optional(),
  }).strict().refine((data) => data !== null, { message: 'Request body cannot be null' }),
});

export type WatchStockInput = z.infer<typeof watchStockSchema>;
