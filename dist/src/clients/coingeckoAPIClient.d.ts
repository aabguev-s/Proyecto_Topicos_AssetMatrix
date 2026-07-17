import { BaseApiClient } from './baseAPIClient';
import { CoinMarketsResponse } from '../models/CryptoDataManagement';
export declare class CryptoApiClient extends BaseApiClient {
    constructor();
    getCoinMarkets(vsCurrency?: string, ids?: string, perPage?: number, page?: number): Promise<CoinMarketsResponse[]>;
}
//# sourceMappingURL=coingeckoAPIClient.d.ts.map