import { IStockWatch } from '../models/StockWatch';
export declare class StockRepository {
    create(data: Partial<IStockWatch>): Promise<IStockWatch>;
    findBySymbol(symbol: string): Promise<IStockWatch | null>;
    findAll(): Promise<IStockWatch[]>;
}
//# sourceMappingURL=stockRepository.d.ts.map