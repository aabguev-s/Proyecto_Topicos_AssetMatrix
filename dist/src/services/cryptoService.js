"use strict";
//services/cryptoService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const cryptoRepository_1 = require("../repositories/cryptoRepository");
const coingeckoAPIClient_1 = require("../clients/coingeckoAPIClient");
// Métodos no definitivos. Se ajustarán al integrar las API externas.
class CryptoService {
    cryptoRepository = new cryptoRepository_1.CryptoRepository();
    CryptoApiClient = new coingeckoAPIClient_1.CryptoApiClient();
    // services/cryptoService.ts
    async getCoinQuote(coinId) {
        // getCoinMarkets espera el "id" de CoinGecko (ej: 'bitcoin'), no el ticker ('BTC')
        const results = await this.CryptoApiClient.getCoinMarkets('usd', coinId.toLowerCase());
        if (!results || results.length === 0) {
            throw new Error(`No se encontraron datos para el activo '${coinId}' en CoinGecko.`);
        }
        return results[0];
    }
}
exports.CryptoService = CryptoService;
//# sourceMappingURL=cryptoService.js.map