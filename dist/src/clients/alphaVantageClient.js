"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlphaVantageClient = void 0;
// alphaVantageClient.ts
const baseAPIClient_1 = require("./baseAPIClient");
// 1. Crear una clase concreta que extienda BaseApiClient
class AlphaVantageApiClient extends baseAPIClient_1.BaseApiClient {
    constructor(config) {
        super(config);
    }
    // Exponer el método request como público si es necesario
    async requestPublic(endpoint, options = {}) {
        return this.request(endpoint, options);
    }
}
class AlphaVantageClient {
    client;
    apiKey;
    constructor(apiKey = process.env.ALPHA_VANTAGE_API_KEY || 'demo') {
        this.apiKey = apiKey;
        this.client = new AlphaVantageApiClient({
            baseUrl: 'https://www.alphavantage.co',
            apiKey: apiKey
        });
    }
    async getGlobalQuote(symbol) {
        // Construir URL con parámetros
        const endpoint = `/query?function=GLOBAL_QUOTE&symbol=${symbol.toUpperCase()}&apikey=${this.apiKey}`;
        // Usar el método público
        const data = await this.client.requestPublic(endpoint);
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