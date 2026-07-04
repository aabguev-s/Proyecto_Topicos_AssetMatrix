"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchStockSchema = exports.stockSymbolParamsSchema = void 0;
const zod_1 = require("zod");
const stockSymbolSchema = zod_1.z
    .string({ error: 'Symbol is required' })
    .min(1, 'Symbol cannot be empty')
    .transform((val) => val.toUpperCase());
// Define watch POST symbol schema directly so we can apply regex and transform
const watchStockSymbolSchema = zod_1.z
    .string({ error: 'Symbol is required' })
    .min(1, 'Symbol cannot be empty')
    .regex(/^.+$/, { message: 'Symbol must be a non-empty string' })
    .transform((val) => val.toUpperCase());
exports.stockSymbolParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        symbol: stockSymbolSchema,
    }),
});
exports.watchStockSchema = zod_1.z.object({
    body: zod_1.z.object({
        symbol: watchStockSymbolSchema,
        companyName: zod_1.z.string().min(1).optional(),
    }).strict().refine((data) => data !== null, { message: 'Request body cannot be null' }),
});
//# sourceMappingURL=stockSchema.js.map