import { z } from 'zod';
export declare const getCoinParamsSchema: z.ZodObject<{
    params: z.ZodObject<{
        coin: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const gettx_idParamsSchema: z.ZodObject<{
    params: z.ZodObject<{
        tx_id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const createTransactionSchema: z.ZodObject<{
    id: z.ZodString;
    transaction: z.ZodOptional<z.ZodObject<{
        current_price: z.ZodNumber;
        total_volume: z.ZodNumber;
        data_from: z.ZodPipe<z.ZodString, z.ZodTransform<Date, string>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const createCryptoSchema: z.ZodObject<{
    body: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        symbol: z.ZodString;
        transactions: z.ZodArray<z.ZodObject<{
            _id: z.ZodOptional<z.ZodString>;
            current_price: z.ZodNumber;
            total_volume: z.ZodNumber;
            createdAt: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateCryptoSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        symbol: z.ZodOptional<z.ZodString>;
        transactions: z.ZodOptional<z.ZodArray<z.ZodObject<{
            _id: z.ZodOptional<z.ZodString>;
            current_price: z.ZodNumber;
            total_volume: z.ZodNumber;
            createdAt: z.ZodString;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const getCryptoParamsSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export type CreateCryptoInput = z.infer<typeof createCryptoSchema>;
export type UpdateCryptoInput = z.infer<typeof updateCryptoSchema>;
//# sourceMappingURL=cryptoSchema.d.ts.map