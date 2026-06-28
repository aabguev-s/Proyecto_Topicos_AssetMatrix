import { z } from 'zod';

// Valida formato id de Mongoose
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const symbolOnlyParams = z.object({
    symbol: z.string().min(1, 'Se requiere de un simbolo').trim().toUpperCase(),
});

const keywordOnlyParams = z.object({
    keyword: z.string().trim().toUpperCase(),
})

const symbolAndOptionalIdParams = z.object({
    symbol: z.string().min(1, 'Se requiere de un simbolo').trim().toUpperCase(),
    id: z.string().regex(objectIdRegex, 'Formato de id inválido').optional(),
});

const idOnlyParams = z.object({
    id: z.string().regex(objectIdRegex, 'Formato de id inválido').optional(),
});

export const checkSymbolOnlySchema = z.object({
    body: symbolOnlyParams,
});

export const checkKeywordOnlySchema = z.object({
    params: keywordOnlyParams,
})

export const checkSymbolOnlySchemaParams = z.object({
    params: symbolOnlyParams,
});

export const checkSymbolAndOptionalIdSchema = z.object({
    body: symbolAndOptionalIdParams,
});

export const checkIdOnlySchema = z.object({
    params: idOnlyParams,
});

export type SymbolOnlyInput = z.infer<typeof checkSymbolOnlySchema>;
export type SymbolAndOptionalIdInput = z.infer<typeof checkSymbolAndOptionalIdSchema>;
export type IdOnlyInput = z.infer<typeof checkIdOnlySchema>;