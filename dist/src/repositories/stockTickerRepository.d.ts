import { IStockTicker, IStockTickerInput } from "../models/StockTicker";
export declare class StockTickerRepository {
    createTickerTracker(data: IStockTickerInput): Promise<IStockTicker>;
    removeTickerTracker(id: string, symbol?: string): Promise<IStockTicker | null>;
    getAllCurrentTickersSymbol(): Promise<String[]>;
    getAllCurrentTickers(): Promise<IStockTicker[]>;
}
//# sourceMappingURL=stockTickerRepository.d.ts.map