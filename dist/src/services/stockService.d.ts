import { StockQuote } from '../clients/alphaVantageClient';
import { IStockWatch } from '../models/StockWatch';
export declare class StockService {
    private stockRepository;
    private alphaVantageClient;
    getStockQuote(symbol: string): Promise<StockQuote>;
    addToWatchlist(data: {
        symbol: string;
        companyName?: string;
    }): Promise<IStockWatch>;
    getWatchlist(): Promise<IStockWatch[]>;
}
//# sourceMappingURL=stockService.d.ts.map