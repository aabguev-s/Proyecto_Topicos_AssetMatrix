"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIdOnlySchema = exports.checkSymbolAndOptionalIdSchema = exports.checkSymbolOnlySchemaParams = exports.checkKeywordOnlySchema = exports.checkSymbolOnlySchema = void 0;
const zod_1 = require("zod");
// Valida formato id de Mongoose
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const symbolOnlyParams = zod_1.z.object({
    symbol: zod_1.z.string().min(3, 'Se requiere un símbolo de al menos 3 caracteres').trim().toUpperCase(),
});
const keywordOnlyParams = zod_1.z.object({
    keyword: zod_1.z.string().min(3, 'Se requiere una palabra clave de al menos 3 caracteres').trim().toUpperCase(),
});
const symbolAndOptionalIdParams = zod_1.z.object({
    symbol: zod_1.z.string().min(1, 'Se requiere de un simbolo').trim().toUpperCase(),
    id: zod_1.z.string().regex(objectIdRegex, 'Formato de id inválido').optional(),
});
const idOnlyParams = zod_1.z.object({
    id: zod_1.z.string().regex(objectIdRegex, 'Formato de id inválido'),
});
exports.checkSymbolOnlySchema = zod_1.z.object({
    body: symbolOnlyParams,
});
exports.checkKeywordOnlySchema = zod_1.z.object({
    params: keywordOnlyParams,
});
exports.checkSymbolOnlySchemaParams = zod_1.z.object({
    params: symbolOnlyParams,
});
exports.checkSymbolAndOptionalIdSchema = zod_1.z.object({
    body: symbolAndOptionalIdParams,
});
exports.checkIdOnlySchema = zod_1.z.object({
    params: idOnlyParams,
});
//# sourceMappingURL=stockParamsSchema.js.map