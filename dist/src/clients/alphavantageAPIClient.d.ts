import { BaseApiClient } from './baseAPIClient';
import { StockSeriesResponse, LatestPriceResponse, MarketStatusResponse, SymbolSearchResponse } from '../models/StockDataManagement';
export declare class StockApiClient extends BaseApiClient {
    constructor();
    private validateResponse;
    getGlobalEquityDaily(symbol: string): Promise<StockSeriesResponse>;
    getGlobalEquityWeekly(symbol: string): Promise<StockSeriesResponse>;
    getGlobalEquityMonthly(symbol: string): Promise<StockSeriesResponse>;
    getLatestPrice(symbol: string): Promise<LatestPriceResponse>;
    getGlobalMarketStatus(): Promise<MarketStatusResponse[]>;
    getSymbolSearch(keyword: string): Promise<SymbolSearchResponse[]>;
    getTickerSMA(symbol: string): Promise<{
        symbol: string;
        data: {
            date: string;
            SMA: number;
        }[];
    }>;
    getTickerRSI(symbol: string): Promise<{
        symbol: string;
        data: {
            date: string;
            RSI: number;
        }[];
    }>;
}
//# sourceMappingURL=alphavantageAPIClient.d.ts.map