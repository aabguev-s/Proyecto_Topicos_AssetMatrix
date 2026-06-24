import { AlphaVantageClient, StockQuote } from '../clients/alphaVantageClient';
import { StockRepository } from '../repositories/stockRepository';
import { IStockWatch } from '../models/StockWatch';

export class StockService {
  private stockRepository = new StockRepository();
  private alphaVantageClient = new AlphaVantageClient();

  async getStockQuote(symbol: string): Promise<StockQuote> {
    return await this.alphaVantageClient.getGlobalQuote(symbol);
  }

  async addToWatchlist(data: { symbol: string; companyName?: string }): Promise<IStockWatch> {
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

  async getWatchlist(): Promise<IStockWatch[]> {
    return await this.stockRepository.findAll();
  }
}