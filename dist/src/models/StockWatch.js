"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockWatch = void 0;
const mongoose_1 = require("mongoose");
const StockWatchSchema = new mongoose_1.Schema({
    symbol: { type: String, required: true, unique: true, uppercase: true },
    companyName: { type: String },
}, { timestamps: true });
exports.StockWatch = (0, mongoose_1.model)('StockWatch', StockWatchSchema);
//# sourceMappingURL=StockWatch.js.map