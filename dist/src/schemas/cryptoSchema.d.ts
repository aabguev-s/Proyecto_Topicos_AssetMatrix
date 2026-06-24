import { z } from 'zod';
export declare const createCryptoSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        price: z.ZodNumber;
        marketCap: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const updateCryptoSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodString;
    }, z.core.$strip>;
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        symbol: z.ZodOptional<z.ZodString>;
        price: z.ZodOptional<z.ZodNumber>;
        marketCap: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
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