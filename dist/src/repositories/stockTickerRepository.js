"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockTickerRepository = void 0;
const StockTicker_1 = require("../models/StockTicker");
class StockTickerRepository {
    async createTickerTracker(data) {
        return await StockTicker_1.StockTicker.create(data);
    }
    async removeTickerTracker(id, symbol) {
        let result;
        if (symbol) {
            result = await StockTicker_1.StockTicker.findOneAndDelete({ symbol: symbol }).exec();
        }
        else {
            result = await StockTicker_1.StockTicker.findByIdAndDelete(id).exec();
        }
        ;
        return result;
    }
    async getAllCurrentTickersSymbol() {
        const raw = await StockTicker_1.StockTicker.find().exec();
        return raw.map((ticker) => ticker.symbol);
    }
    ;
    async getAllCurrentTickers() {
        return await StockTicker_1.StockTicker.find().exec();
    }
    ;
}
exports.StockTickerRepository = StockTickerRepository;
//# sourceMappingURL=stockTickerRepository.js.map