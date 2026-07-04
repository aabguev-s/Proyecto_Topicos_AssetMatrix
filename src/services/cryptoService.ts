//services/cryptoService.ts

import { CryptoRepository } from '../repositories/cryptoRepository';
import { ICrypto, ICryptoTransaction } from '../models/Crypto';
import {CryptoApiClient} from '../clients/coingeckoAPIClient';


// Métodos no definitivos. Se ajustarán al integrar las API externas.

export class CryptoService {
  private cryptoRepository = new CryptoRepository();
  private CryptoApiClient = new CryptoApiClient();

  async createCrypto(data: Partial<ICrypto>): Promise<ICrypto> {
    if (!data.id || !data.name || !data.symbol) {
      throw new Error('id, name, and symbol are required to process this operation');
    }

    // Normalizamos el símbolo a mayúsculas
    data.symbol = data.symbol.toUpperCase();

    // 1. Extraer la nueva transacción del payload
    const newTransaction = data.transactions && data.transactions.length > 0 
      ? data.transactions[0] 
      : null;

    if (!newTransaction) {
      throw new Error('Al menos una transacción es requerida para procesar la operación');
    }

    // 2. Intentar buscar si la moneda ya existe usando tu repositorio por ID, Nombre o Símbolo
    let crypto = await this.cryptoRepository.findByIdNameOrSymbol(data.id) ||
                 await this.cryptoRepository.findByIdNameOrSymbol(data.name) ||
                 await this.cryptoRepository.findByIdNameOrSymbol(data.symbol);

    if (crypto) {
      // CASO A: Ya existe. Llamamos al método del repositorio para hacer el $push seguro
      const updated = await this.cryptoRepository.pushTransaction(crypto.id, newTransaction as ICryptoTransaction);
      
      if (!updated) throw new Error('Error al anexar la transacción');
      return updated;
    } else {
      // CASO B: No existe, creamos el documento desde cero con su primera transacción
      return await this.cryptoRepository.create(data);
    }
  }

  async getAllCryptos(): Promise<ICrypto[]> {
    return await this.cryptoRepository.findAll();
  }

  async getCryptoById(id: string): Promise<ICrypto> {
    const crypto = await this.cryptoRepository.findById(id);
    if (!crypto) throw new Error('Cryptocurrency asset not found');
    return crypto;
  }

  async updateCrypto(id: string, data: Partial<ICrypto>): Promise<ICrypto> {
    if (data.symbol) data.symbol = data.symbol.toUpperCase();
    const updatedCrypto = await this.cryptoRepository.update(id, data);
    if (!updatedCrypto) throw new Error('Cryptocurrency target does not exist');
    return updatedCrypto;
  }

  async deleteCrypto(id: string): Promise<void> {
    const deleted = await this.cryptoRepository.delete(id);
    if (!deleted) throw new Error('Cryptocurrency target does not exist');
  }

  async getPortfolioAnalytics() {
    const cryptos = await this.cryptoRepository.findAll();
    let totalTransactionsProcessed = 0;
    
    // Métricas para el Balance Total de Cartera Histórica
    let totalInitialValue = 0; // Lo que valía el mercado al registrar cada moneda
    let totalCurrentValue = 0; // Lo que vale el mercado en su última actualización
    
    let marketSummary: { 
      [key: string]: { 
        initialPrice: number;
        lastPrice: number; 
        lastVolume: number;
        assetGrowthPercentage: number;
      } 
    } = {};

    cryptos.forEach(crypto => {
      const symbolUpper = crypto.symbol.toUpperCase();
      
      if (crypto.transactions && crypto.transactions.length > 0) {
        totalTransactionsProcessed += crypto.transactions.length;

        // Primer registro histórico (Precio inicial en tu base de datos)
        const firstTx = crypto.transactions[0] as ICryptoTransaction;
        // Último registro histórico (Precio actual en tu base de datos)
        const latestTx = crypto.transactions[crypto.transactions.length - 1] as ICryptoTransaction;
        
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
      } else {
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

  async getCoinQuote(coinId: string) {
    // getCoinMarkets espera el "id" de CoinGecko (ej: 'bitcoin'), no el ticker ('BTC')
    const results = await this.CryptoApiClient.getCoinMarkets('usd', coinId.toLowerCase());
    if (!results || results.length === 0) {
      throw new Error(`No se encontraron datos para el activo '${coinId}' en CoinGecko.`);
    }
    return results[0];
  }
}