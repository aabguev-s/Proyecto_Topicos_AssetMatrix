export interface StockQuote {
    symbol: string;
    price: number;
    volume: number;
    change: number;
    changePercent: string;
    latestTradingDay: string;
}
export declare class AlphaVantageClient {
    private readonly client;
    private readonly apiKey;
    constructor(apiKey?: string);
    getGlobalQuote(symbol: string): Promise<StockQuote>;
}
//# sourceMappingURL=alphaVantageClient.d.ts.map