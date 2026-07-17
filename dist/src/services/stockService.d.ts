import { IStockTicker } from "../models/StockTicker";
import { StockSeriesResponse, SymbolSearchResponse, SeriesDataReturnPacked, StockHistory, TrackingSummaryResponse } from "../models/StockDataManagement";
export declare class StockService {
    private stockRepository;
    private stockApiClient;
    getTrackedDataForSavedTickersDay(): Promise<StockSeriesResponse[]>;
    getTrackedDataForSavedTickersWeek(): Promise<StockSeriesResponse[]>;
    getTrackedDataForSavedTickersMonth(): Promise<StockSeriesResponse[]>;
    getDataFromCurrentTracked(): Promise<IStockTicker[]>;
    getTrackedDataForTickerDay(symbol: string): Promise<StockSeriesResponse>;
    getTrackedDataForTickerWeek(symbol: string): Promise<StockSeriesResponse>;
    getTrackedDataForTickerMonth(symbol: string): Promise<StockSeriesResponse>;
    searchByKeyword(keyword: string): Promise<SymbolSearchResponse[]>;
    getCurrentTickerData(symbol: string): Promise<SeriesDataReturnPacked>;
    getCurrentTrackedTickerData(): Promise<SeriesDataReturnPacked[]>;
    getAllCurrentTickerData(symbol: string): Promise<SeriesDataReturnPacked>;
    getAllCurrentTrackedTickerData(): Promise<SeriesDataReturnPacked[]>;
    getHistoricTrendsTracked(): Promise<StockHistory[]>;
    getAllDBTrackedTickers(): Promise<IStockTicker[]>;
    startTrackingTicker(symbol: string): Promise<TrackingSummaryResponse>;
    removeTickerFromTracking(id: string, symbol?: string): Promise<IStockTicker | null>;
}
//# sourceMappingURL=stockService.d.ts.map