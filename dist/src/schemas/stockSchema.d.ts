import { z } from 'zod';
export declare const stockSymbolParamsSchema: z.ZodObject<{
    params: z.ZodObject<{
        symbol: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const watchStockSchema: z.ZodObject<{
    body: z.ZodObject<{
        symbol: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
        companyName: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export type WatchStockInput = z.infer<typeof watchStockSchema>;
//# sourceMappingURL=stockSchema.d.ts.map