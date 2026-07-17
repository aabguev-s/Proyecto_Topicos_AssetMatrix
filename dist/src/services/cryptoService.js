"use strict";
//services/cryptoService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const cryptoRepository_1 = require("../repositories/cryptoRepository");
const coingeckoAPIClient_1 = require("../clients/coingeckoAPIClient");
class CryptoService {
    cryptoRepository = new cryptoRepository_1.CryptoRepository();
    CryptoApiClient = new coingeckoAPIClient_1.CryptoApiClient();
    async createCrypto(cryptoId, transaction) {
        if (!cryptoId || cryptoId.trim() === '') {
            throw new Error('Se requiere un ID de criptomoneda válido para procesar la transacción');
        }
        let data = await this.cryptoRepository.findById(cryptoId.toLowerCase());
        let fetched = null;
        if (!data) {
            // Si no existe, creamos un nuevo registro
            fetched = await this.CryptoApiClient.getCoinMarkets('usd', cryptoId.toLowerCase());
            if (!fetched || !fetched[0] || fetched.length === 0) {
                throw new Error(`No se pudo obtener información de la criptomoneda con ID: ${cryptoId}`);
            }
            data = {
                id: fetched[0].id,
                name: fetched[0].name,
                symbol: fetched[0].symbol.toUpperCase(),
                transactions: []
            };
            data = await this.cryptoRepository.create(data);
        }
        let response;
        if (!transaction || !transaction.current_price || !transaction.total_volume || !transaction.data_from) {
            if (!fetched) {
                fetched = await this.CryptoApiClient.getCoinMarkets('usd', cryptoId.toLowerCase());
            }
            if (!fetched || !fetched[0] || fetched.length === 0) {
                throw new Error(`No se pudo obtener información de la criptomoneda con ID: ${cryptoId}`);
            }
            const newTransaction = {
                current_price: fetched[0].current_price,
                total_volume: fetched[0].total_volume,
                data_from: fetched[0].last_updated || new Date().toISOString(),
                createdAt: new Date().toISOString()
            };
            response = await this.cryptoRepository.pushTransaction(data.id, newTransaction);
        }
        else {
            let newTransaction = {
                current_price: transaction.current_price,
                total_volume: transaction.total_volume,
                data_from: transaction.data_from,
                createdAt: new Date().toISOString()
            };
            response = await this.cryptoRepository.pushTransaction(data.id, newTransaction);
        }
        if (!response)
            throw new Error('Error al anexar la transacción');
        return response;
    }
    async getAllCryptos() {
        return await this.cryptoRepository.findAll();
    }
    async getCryptoById(id) {
        const crypto = await this.cryptoRepository.findById(id);
        if (!crypto)
            throw new Error('Cryptocurrency asset not found');
        return crypto;
    }
    async updateCrypto(id, data) {
        if (data.symbol)
            data.symbol = data.symbol.toUpperCase();
        const updatedCrypto = await this.cryptoRepository.update(id, data);
        if (!updatedCrypto)
            throw new Error('Cryptocurrency target does not exist');
        return updatedCrypto;
    }
    async deleteCrypto(id) {
        const deleted = await this.cryptoRepository.delete(id);
        if (!deleted)
            throw new Error('Cryptocurrency target does not exist');
    }
    async getPortfolioAnalytics() {
        const cryptos = await this.cryptoRepository.findAll();
        let totalTransactionsProcessed = 0;
        // Métricas para el Balance Total de Cartera Histórica
        let totalInitialValue = 0; // Lo que valía el mercado al registrar cada moneda
        let totalCurrentValue = 0; // Lo que vale el mercado en su última actualización
        let marketSummary = {};
        cryptos.forEach(crypto => {
            const symbolUpper = crypto.symbol.toUpperCase();
            if (crypto.transactions && crypto.transactions.length > 0) {
                totalTransactionsProcessed += crypto.transactions.length;
                // Primer registro histórico (Precio inicial en tu base de datos)
                const firstTx = crypto.transactions[0];
                // Último registro histórico (Precio actual en tu base de datos)
                const latestTx = crypto.transactions[crypto.transactions.length - 1];
                const initialPrice = firstTx.current_price;
                const lastPrice = latestTx.current_price;
                // Acumulamos para los totales globales de la cartera
                totalInitialValue += initialPrice;
                totalCurrentValue += lastPrice;
                // Calcular el crecimiento individual de este activo en tu historial
                const assetGrowthPercentage = initialPrice > 0
                    ? ((lastPrice - initialPrice) / initialPrice) * 100
                    : 0;
                marketSummary[symbolUpper] = {
                    initialPrice,
                    lastPrice,
                    lastVolume: latestTx.total_volume,
                    assetGrowthPercentage: Number(assetGrowthPercentage.toFixed(2)) // Redondeado a 2 decimales
                };
            }
            else {
                marketSummary[symbolUpper] = {
                    initialPrice: 0,
                    lastPrice: 0,
                    lastVolume: 0,
                    assetGrowthPercentage: 0
                };
            }
        });
        // Cálculos globales del Balance de Cartera Histórica
        const netHistoricalProfitOrLoss = totalCurrentValue - totalInitialValue;
        const globalGrowthPercentage = totalInitialValue > 0
            ? (netHistoricalProfitOrLoss / totalInitialValue) * 100
            : 0;
        return {
            totalTransactionsProcessed,
            portfolioHistoricalBalance: {
                totalInitialValue,
                totalCurrentValue,
                netHistoricalProfitOrLoss,
                globalGrowthPercentage: Number(globalGrowthPercentage.toFixed(2))
            },
            marketSummary
        };
    }
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