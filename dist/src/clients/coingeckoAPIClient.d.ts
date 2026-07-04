import { BaseApiClient } from './baseAPIClient';
export interface CoinMarketsResponse {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    price_change_percentage_24h?: number;
    circulating_supply?: number;
    total_supply?: number;
}
export declare class CryptoApiClient extends BaseApiClient {
    constructor();
    getCoinMarkets(vsCurrency?: string, ids?: string, perPage?: number, page?: number): Promise<CoinMarketsResponse[]>;
}
//# sourceMappingURL=coingeckoAPIClient.d.ts.map