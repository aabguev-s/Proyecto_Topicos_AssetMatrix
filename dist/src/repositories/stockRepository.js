"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockRepository = void 0;
const StockWatch_1 = require("../models/StockWatch");
class StockRepository {
    async create(data) {
        return await StockWatch_1.StockWatch.create(data);
    }
    async findBySymbol(symbol) {
        return await StockWatch_1.StockWatch.findOne({ symbol: symbol.toUpperCase() }).exec();
    }
    async findAll() {
        return await StockWatch_1.StockWatch.find().sort({ createdAt: -1 }).exec();
    }
}
exports.StockRepository = StockRepository;
//# sourceMappingURL=stockRepository.js.map