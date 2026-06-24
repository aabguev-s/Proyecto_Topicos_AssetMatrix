"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoParamsSchema = exports.updateCryptoSchema = exports.createCryptoSchema = void 0;
const zod_1 = require("zod");
// Schema de prueba. Se ajustará al integrar las API externas.
const cryptoBodySchema = zod_1.z.object({
    name: zod_1.z.string({ error: 'Name is required' }).min(2),
    symbol: zod_1.z.string({ error: 'Symbol is required' }).min(2).max(10),
    price: zod_1.z.number({ error: 'Price must be a number' }).positive(),
    marketCap: zod_1.z.number().positive().optional(),
});
const cryptoParamsSchema = zod_1.z.object({
    id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId'),
});
exports.createCryptoSchema = zod_1.z.object({
    body: cryptoBodySchema
});
exports.updateCryptoSchema = zod_1.z.object({
    params: cryptoParamsSchema,
    body: cryptoBodySchema.partial()
});
exports.getCryptoParamsSchema = zod_1.z.object({
    params: cryptoParamsSchema
});
//# sourceMappingURL=cryptoSchema.js.map