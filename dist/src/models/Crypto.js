"use strict";
//models/Crypto.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const mongoose_1 = require("mongoose");
const CryptoTransactionSchema = new mongoose_1.Schema({
    current_price: { type: Number, required: true },
    total_volume: { type: Number, required: true },
    data_from: { type: String, required: false }, // Almacena la fecha como string ISO
    createdAt: { type: String, required: true } // Almacena la fecha como string ISO
}, { _id: true } // Nos aseguramos de que la BD le cree su ID automático a cada transacción
);
const CryptoSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true }, // Campo para tu ID manual
    name: { type: String, required: true, unique: true },
    symbol: { type: String, required: true, uppercase: true },
    transactions: [CryptoTransactionSchema],
});
exports.Crypto = (0, mongoose_1.model)('Crypto', CryptoSchema);
//# sourceMappingURL=Crypto.js.map