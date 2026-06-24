"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const alphaVantageClient_1 = require("../clients/alphaVantageClient");
const stockRepository_1 = require("../repositories/stockRepository");
class StockService {
    stockRepository = new stockRepository_1.StockRepository();
    alphaVantageClient = new alphaVantageClient_1.AlphaVantageClient();
    async getStockQuote(symbol) {
        return await this.alphaVantageClient.getGlobalQuote(symbol);
    }
    async addToWatchlist(data) {
        const symbol = data.symbol.toUpperCase();
        const existing = await this.stockRepository.findBySymbol(symbol);
        if (existing) {
            throw new Error('Stock already exists in watchlist');
        }
        return await this.stockRepository.create({
            symbol,
            ...(data.companyName ? { companyName: data.companyName } : {}),
        });
    }
    async getWatchlist() {
        return await this.stockRepository.findAll();
    }
}
exports.StockService = StockService;
//# sourceMappingURL=stockService.js.map