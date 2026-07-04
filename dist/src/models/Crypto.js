"use strict";
//models/Crypto.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const mongoose_1 = require("mongoose");
const CryptoTransactionSchema = new mongoose_1.Schema({
    type: { type: String, enum: ['buy', 'sell'], required: true },
    amount: { type: Number, required: true },
    priceAtTx: { type: Number, required: true },
}, { timestamps: true });
const CryptoSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    symbol: { type: String, required: true, uppercase: true },
    price: { type: Number, required: true },
    marketCap: { type: Number },
    transactions: [CryptoTransactionSchema],
}, { timestamps: true });
exports.Crypto = (0, mongoose_1.model)('Crypto', CryptoSchema);
//# sourceMappingURL=Crypto.js.map