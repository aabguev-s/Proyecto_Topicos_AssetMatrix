"use strict";
//schemas/cryptoSchemas.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoinParamsSchema = void 0;
// @ts-nocheck
const zod_1 = require("zod");
// schemas/cryptoSchema.ts
exports.getCoinParamsSchema = zod_1.z.object({
    params: zod_1.z.object({
        coin: zod_1.z.string({ error: 'El id de la moneda es requerido' }).min(2).toLowerCase(),
    }),
});
//# sourceMappingURL=cryptoSchema.js.map