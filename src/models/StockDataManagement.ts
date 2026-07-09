export interface StockSeriesResponse {
    symbol: string;
    lastUpdated: string;
    timeSeries: { date: string; open: number; high: number; low: number; close: number; volume: number } [];
}

export interface LatestPriceResponse {
    symbol: string;
    open: number;
    high: number;
    low: number;
    price: number;
    volume: number;
    latestTradingDay: string;
    previousClose: number;
    change: number;
    changePercent: number;
}

export interface MarketStatusResponse {
    marketType: string;
    region: string;
    marketOpen: string;
    marketClose: string;
    currentStatus: boolean;
}

export interface SymbolSearchResponse {
    symbol: string;
    name: string;
    type: string;
    region:string;
    currency: string;
    score: number;
}



export interface TrackingSummaryResponse {
    searchKeyword: string;
    totalMatchesFound: number;
    trackedCount: number;
    trackedTickers: { symbol: string; name: string }[];
    ignoredCount: number;
}

interface SeriesDataReturn {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

export interface SeriesDataReturnPacked{
    symbol: string;
    daily: SeriesDataReturn[];
    weekly: SeriesDataReturn[];
    monthly: SeriesDataReturn[];
}

export interface StockHistory{
    symbol: string,
    trends: {
        weekly:{
            price: number,
            performance: {
                percentageChange: number,
                isBullish: boolean,         // Está en alta?
                volatilityStatus: "overbought" | "oversold" | "normal",   // overbougth oversold normal
                volumeVsAverage: number,
            },
            indicators: {
                rsi: number,
                sma: number,
            }
        }
    }
}