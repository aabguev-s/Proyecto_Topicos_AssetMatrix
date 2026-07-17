"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTicker = void 0;
const mongoose_1 = require("mongoose");
;
const StockTickerSchema = new mongoose_1.Schema({
    name: { type: String, required: true, uppercase: true },
    symbol: { type: String, required: true, uppercase: true, unique: true },
    type: { type: String, required: true },
    region: { type: String, required: true },
    currency: { type: String, required: true, uppercase: true }
}, { timestamps: true });
exports.StockTicker = (0, mongoose_1.model)('StockTicker', StockTickerSchema);
//# sourceMappingURL=StockTicker.js.map