import { BaseApiClient } from "./baseAPIClient";


export interface CoinMarketsResponse {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
}

export interface MarketChartPoint {
  timestamp: number;
  price: number;
  market_cap: number;
  total_volume: number;
}

export interface CoinMarketChartRangeResponse {
  coinId: string;
  currency: string;
  data: MarketChartPoint[];
}

export class CryptoApiClient extends BaseApiClient {
    constructor() {
        super({
            baseUrl : 'https://api.coingecko.com/api/v3/',
            apiKey: process.env.COINGECKO_API_KEY || '<api-key>',
        });
    }

   /**
   * Obtiene y mapea los datos de mercado de las criptomonedas seleccionadas
   */
  async getCoinMarkets(vsCurrency: string = 'usd', ids: string, names: string, symbols: string): Promise<CoinMarketsResponse[]> {
    if (!ids && !names && !symbols) {
      throw new Error('Debe proporcionar al menos un parámetro de filtro (ids, names o symbols).');
    }

    const endpoint = `/coins/markets?vs_currency=${vsCurrency}&ids=${ids || ''}&names=${names || ''}&symbols=${symbols || ''}&order=market_cap_desc`;
    
    const options: RequestInit = {};
    if (this.apiKey && this.apiKey.trim() !== '') {
      options.headers = {
        'x-cg-demo-api-key': this.apiKey
      };
    }

    const raw = await this.request<any[]>(endpoint, options);

    if (raw && (raw as any).error) {
      console.error("CoinGecko API Error Context:", raw);
      throw new Error(`CoinGecko API failed: ${(raw as any).error}`);
    }

    return raw.map((coin): CoinMarketsResponse => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume
    }));
  };

  // from y to provienen de la función getRangeDayUnix manejado en la capa de servicios
  async getCoinMarketChartRange(id: string, from: number, to: number, vsCurrency: string = 'usd'): Promise<CoinMarketChartRangeResponse> {
    if (!id) {
      throw new Error('El ID de la moneda es obligatorio para consultar el rango histórico.');
    }

    const endpoint = `/coins/${id}/market_chart/range?vs_currency=${vsCurrency}&from=${from}&to=${to}`;
    
    const options: RequestInit = {};
    if (this.apiKey && this.apiKey.trim() !== '') {
      options.headers = {
        'x-cg-demo-api-key': this.apiKey
      };
    }

    const raw = await this.request<any>(endpoint, options);

    if (raw && raw.error) {
      console.error("CoinGecko Chart API Error Context:", raw);
      throw new Error(`CoinGecko Chart API failed: ${raw.error}`);
    }

    const mappedData: MarketChartPoint[] = (raw.prices || []).map((priceEntry: [number, number], index: number): MarketChartPoint => {
      const [timestamp, price] = priceEntry;
      
      const marketCap = raw.market_caps?.[index]?.[1] ?? 0;
      const totalVolume = raw.total_volumes?.[index]?.[1] ?? 0;

      return {
        timestamp, // Mantiene los milisegundos devuelvos por CoinGecko
        price,
        market_cap: marketCap,
        total_volume: totalVolume
      };
    });

    return {
      coinId: id,
      currency: vsCurrency,
      data: mappedData
    };
  }
}
