import { z } from 'zod';
export declare const checkSymbolOnlySchema: z.ZodObject<{
    body: z.ZodObject<{
        symbol: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const checkKeywordOnlySchema: z.ZodObject<{
    params: z.ZodObject<{
        keyword: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const checkSymbolOnlySchemaParams: z.ZodObject<{
    params: z.ZodObject<{
        symbol: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const checkSymbolAndOptionalIdSchema: z.ZodObject<{
    body: z.ZodObject<{
        symbol: z.ZodString;
        id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const checkIdOnlySchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SymbolOnlyInput = z.infer<typeof checkSymbolOnlySchema>;
export type SymbolAndOptionalIdInput = z.infer<typeof checkSymbolAndOptionalIdSchema>;
export type IdOnlyInput = z.infer<typeof checkIdOnlySchema>;
//# sourceMappingURL=stockParamsSchema.d.ts.map