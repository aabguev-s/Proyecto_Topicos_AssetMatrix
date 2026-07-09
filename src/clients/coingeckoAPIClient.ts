//clients/coingeckoAPIClient.ts

import { BaseApiClient, ApiClientConfig } from './baseAPIClient';
import { CoinMarketsResponse } from '../models/CryptoDataManagement';

export class CryptoApiClient extends BaseApiClient {
    constructor() {
        super({
            baseUrl: 'https://api.coingecko.com/api/v3/',
            apiKey: process.env.COINGECKO_API_KEY || ''
        });
    }

    async getCoinMarkets(
        vsCurrency: string = 'usd', 
        ids?: string,
        perPage: number = 100,
        page: number = 1
    ): Promise<CoinMarketsResponse[]> {
        let endpoint = `/coins/markets?vs_currency=${vsCurrency}`;
        endpoint += `&order=market_cap_desc`;
        endpoint += `&per_page=${Math.min(perPage, 250)}`;
        endpoint += `&page=${page}`;
        endpoint += `&sparkline=false`;
        endpoint += `&price_change_percentage=24h`;
        
        if (ids && ids.trim() !== '') {
            endpoint += `&ids=${ids}`;
        }

        const options: RequestInit = {};
        if (this.apiKey && this.apiKey.trim() !== '') {
          options.headers = {
            'x-cg-demo-api-key': this.apiKey
          };
        }
        

        const raw = await this.request<any[]>(endpoint, options);

        if (!raw || !Array.isArray(raw)) {
            console.error("CoinGecko API Error Context:", raw);
            throw new Error('Respuesta inválida de CoinGecko API');
        }

        return raw.map((coin): CoinMarketsResponse => ({
            id: coin.id || '',
            name: coin.name || '',
            symbol: (coin.symbol || '').toUpperCase(),
            current_price: coin.current_price || 0,
            market_cap: coin.market_cap || 0,
            total_volume: coin.total_volume || 0,
            price_change_percentage_24h: coin.price_change_percentage_24h || 0,
            circulating_supply: coin.circulating_supply || 0,
            total_supply: coin.total_supply || 0,
            last_updated: coin.last_updated || ''
        }));
    }
}