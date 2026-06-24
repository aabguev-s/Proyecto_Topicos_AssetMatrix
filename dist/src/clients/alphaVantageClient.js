"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaVantageClient = void 0;
const baseAPIClient_1 = require("./baseAPIClient");
class AlphaVantageClient {
    client;
    constructor(apiKey = process.env.ALPHA_VANTAGE_API_KEY || 'demo') {
        this.client = new baseAPIClient_1.BaseAPIClient('https://www.alphavantage.co', { apikey: apiKey });
    }
    async getGlobalQuote(symbol) {
        const data = await this.client.get('/query', {
            function: 'GLOBAL_QUOTE',
            symbol: symbol.toUpperCase(),
        });
        if (data.Note || data.Information) {
            throw new Error(data.Note || data.Information || 'Alpha Vantage API limit reached');
        }
        if (data['Error Message']) {
            throw new Error(data['Error Message']);
        }
        const quote = data['Global Quote'];
        if (!quote?.['01. symbol']) {
            throw new Error(`Stock symbol '${symbol.toUpperCase()}' not found`);
        }
        return {
            symbol: quote['01. symbol'],
            price: Number.parseFloat(quote['05. price'] ?? '0'),
            volume: Number.parseInt(quote['06. volume'] ?? '0', 10),
            change: Number.parseFloat(quote['09. change'] ?? '0'),
            changePercent: quote['10. change percent'] ?? '0%',
            latestTradingDay: quote['07. latest trading day'] ?? '',
        };
    }
}
exports.AlphaVantageClient = AlphaVantageClient;
//# sourceMappingURL=alphaVantageClient.js.map