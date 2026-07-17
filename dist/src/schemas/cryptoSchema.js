"use strict";
//schemas/cryptoSchemas.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCryptoParamsSchema = exports.updateCryptoSchema = exports.createCryptoSchema = exports.createTransactionSchema = exports.gettx_idParamsSchema = exports.getCoinParamsSchema = void 0;
// @ts-nocheck
const zod_1 = require("zod");
// schemas/cryptoSchema.ts
exports.getCoinParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        coin: zod_1.z.string({ error: 'El id de la moneda es requerido' }).min(2).toLowerCase(),
    }),
});
exports.gettx_idParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        tx_id: zod_1.z.string({ error: 'El id de la transacción en la base de datos es requerido' }),
    }),
});
exports.createTransactionSchema = zod_1.z.object({
    id: zod_1.z.string({ error: 'Se requiere un ID válido' }).trim().toLowerCase(),
    transaction: zod_1.z.object({
        current_price: zod_1.z.number({ error: 'Precio actual debe ser un número' }),
        total_volume: zod_1.z.number({ error: 'Volumen total debe ser un número' }),
        data_from: zod_1.z.string({ error: 'La fecha de creación debe ser un string del formato yyyy-MM-dd' })
            .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/, 'La fecha debe tener formato yyyy-MM-dd')
            .transform((s) => {
            const d = new Date(s);
            if (Number.isNaN(d.getTime()))
                throw new Error('Fecha inválida');
            return d;
        })
    }).optional()
});
const transactionBodySchema = zod_1.z.object({
    _id: zod_1.z.string().optional(),
    current_price: zod_1.z.number({ error: 'Current price must be a number' }),
    total_volume: zod_1.z.number({ error: 'Total volume must be a number' }),
    createdAt: zod_1.z.string({ error: 'CreatedAt must be a string' })
});
const cryptoBodySchema = zod_1.z.object({
    id: zod_1.z.string({ error: 'Id is required' }),
    name: zod_1.z.string({ error: 'Name is required' }).min(2),
    symbol: zod_1.z.string({ error: 'Symbol is required' }).min(2).max(10),
    transactions: zod_1.z.array(transactionBodySchema)
});
const cryptoParamsSchema = zod_1.z.object({
    id: zod_1.z.string({ error: 'Id must be a valid string' }),
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