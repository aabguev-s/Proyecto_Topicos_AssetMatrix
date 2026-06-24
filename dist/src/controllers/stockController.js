"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const stockService_1 = require("../services/stockService");
class StockController {
    stockService = new stockService_1.StockService();
    getQuote = async (req, res) => {
        try {
            const result = await this.stockService.getStockQuote(req.params.symbol);
            res.status(200).json(result);
        }
        catch (error) {
            const message = error.message;
            if (message.includes('not found')) {
                res.status(404).json({ error: message });
                return;
            }
            res.status(500).json({ error: message || 'External API connection error' });
        }
    };
    addToWatchlist = async (req, res) => {
        try {
            const result = await this.stockService.addToWatchlist(req.body);
            res.status(201).json(result);
        }
        catch (error) {
            const message = error.message;
            if (/exist|duplicate|already in watchlist|already exists/i.test(message)) {
                res.status(409).json({ error: message });
                return;
            }
            res.status(500).json({ error: message || 'Failed to save stock to watchlist' });
        }
    };
    getWatchlist = async (_req, res) => {
        try {
            const result = await this.stockService.getWatchlist();
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message || 'Failed to retrieve watchlist' });
        }
    };
}
exports.StockController = StockController;
//# sourceMappingURL=stockController.js.map