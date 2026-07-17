"use strict";
//clients/coingeckoAPIClient.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoApiClient = void 0;
const baseAPIClient_1 = require("./baseAPIClient");
class CryptoApiClient extends baseAPIClient_1.BaseApiClient {
    constructor() {
        super({
            baseUrl: 'https://api.coingecko.com/api/v3/',
            apiKey: process.env.COINGECKO_API_KEY || ''
        });
    }
    async getCoinMarkets(vsCurrency = 'usd', ids, perPage = 100, page = 1) {
        let endpoint = `/coins/markets?vs_currency=${vsCurrency}`;
        endpoint += `&order=market_cap_desc`;
        endpoint += `&per_page=${Math.min(perPage, 250)}`;
        endpoint += `&page=${page}`;
        endpoint += `&sparkline=false`;
        endpoint += `&price_change_percentage=24h`;
        if (ids && ids.trim() !== '') {
            endpoint += `&ids=${ids}`;
        }
        const options = {};
        if (this.apiKey && this.apiKey.trim() !== '') {
            options.headers = {
                'x-cg-demo-api-key': this.apiKey
            };
        }
        let raw;
        try {
            raw = await this.request(endpoint, options);
        }
        catch (err) {
            // Si el proveedor devolvió un mensaje, request ya lo incluye en el error.message
            console.error('CoinGecko client request failed:', err.message || err);
            throw err;
        }
        if (raw && (raw.error || raw.message)) {
            console.error("CoinGecko API Error Context:", raw);
            const providerMessage = raw.error || raw.message;
            throw new Error(`CoinGecko API ha fallado: ${providerMessage}`);
        }
        if (!raw || !Array.isArray(raw)) {
            console.error("CoinGecko API Error Context:", raw);
            throw new Error('Respuesta inválida de CoinGecko API');
        }
        return raw.map((coin) => ({
            id: coin.id || '',
            name: coin.name || '',
            symbol: (coin.symbol || '').toUpperCase(),
            current_price: coin.current_price || 0,
            market_cap: coin.market_cap || 0,
            total_volume: coin.total_volume || 0,
            price_change_percentage_24h: coin.price_change_percentage_24h || 0,
            circulating_supply: coin.circulating_supply || 0,
            total_supply: coin.total_supply || 0,
            last_updated: coin.last_updated || ''
        }));
    }
}
exports.CryptoApiClient = CryptoApiClient;
//# sourceMappingURL=coingeckoAPIClient.js.map