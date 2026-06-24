"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crypto = void 0;
const mongoose_1 = require("mongoose");
const CryptoSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    symbol: { type: String, required: true, uppercase: true },
    price: { type: Number, required: true },
    marketCap: { type: Number },
}, { timestamps: true });
exports.Crypto = (0, mongoose_1.model)('Crypto', CryptoSchema);
//# sourceMappingURL=Crypto.js.map