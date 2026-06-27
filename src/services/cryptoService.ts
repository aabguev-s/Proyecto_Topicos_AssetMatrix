import { CryptoRepository } from '../repositories/cryptoRepository';
import { ICrypto, ICryptoTransaction } from '../models/Crypto';

// Métodos no definitivos. Se ajustarán al integrar las API externas.

export class CryptoService {
  private cryptoRepository = new CryptoRepository();

  async createCrypto(data: Partial<ICrypto>): Promise<ICrypto> {
    if (data.symbol) data.symbol = data.symbol.toUpperCase();
    return await this.cryptoRepository.create(data);
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
    let estimatedNetInvestment = 0;
    let totalPortfolioValue = 0;
    let holdings: { [key: string]: number } = {};
    let totalTransactionsProcessed = 0;
    cryptos.forEach(crypto => {
      const symbolUpper = crypto.symbol.toUpperCase();
      if (crypto.transactions && crypto.transactions.length > 0) {
        totalTransactionsProcessed += crypto.transactions.length;

        crypto.transactions.forEach(tx => {
          const value = tx.amount * tx.priceAtTx;
          if (tx.type === 'buy') {
            estimatedNetInvestment += value;
            holdings[symbolUpper] = (holdings[symbolUpper] || 0) + tx.amount;
          } else if (tx.type === 'sell') {
            estimatedNetInvestment -= value;
            holdings[symbolUpper] = (holdings[symbolUpper] || 0) - tx.amount;
          }
        });
      }
      const cryptoAmount = holdings[symbolUpper] || 0;
      totalPortfolioValue += cryptoAmount * crypto.price;
    });
    return {
      totalTransactionsProcessed,
      estimatedNetInvestment,
      totalPortfolioValue,
      netProfitOrLoss: totalPortfolioValue - estimatedNetInvestment,
      holdings
    };
  }
}