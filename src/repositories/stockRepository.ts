import { StockWatch, IStockWatch } from '../models/StockWatch';

export class StockRepository {
  async create(data: Partial<IStockWatch>): Promise<IStockWatch> {
    return await StockWatch.create(data);
  }

  async findBySymbol(symbol: string): Promise<IStockWatch | null> {
    return await StockWatch.findOne({ symbol: symbol.toUpperCase() }).exec();
  }

  async findAll(): Promise<IStockWatch[]> {
    return await StockWatch.find().sort({ createdAt: -1 }).exec();
  }
}
