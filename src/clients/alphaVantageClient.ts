// alphaVantageClient.ts
import { BaseApiClient, ApiClientConfig } from './baseAPIClient';

// 1. Crear una clase concreta que extienda BaseApiClient
class AlphaVantageApiClient extends BaseApiClient {
  constructor(config: ApiClientConfig) {
    super(config);
  }

  // Exponer el método request como público si es necesario
  async requestPublic<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, options);
  }
}

interface GlobalQuoteRaw {
  '01. symbol'?: string;
  '05. price'?: string;
  '06. volume'?: string;
  '07. latest trading day'?: string;
  '09. change'?: string;
  '10. change percent'?: string;
}

interface AlphaVantageQuoteResponse {
  'Global Quote'?: GlobalQuoteRaw;
  Note?: string;
  Information?: string;
  'Error Message'?: string;
}

export interface StockQuote {
  symbol: string;
  price: number;
  volume: number;
  change: number;
  changePercent: string;
  latestTradingDay: string;
}

export class AlphaVantageClient {
  private readonly client: AlphaVantageApiClient;
  private readonly apiKey: string;

  constructor(apiKey: string = process.env.ALPHA_VANTAGE_API_KEY || 'demo') {
    this.apiKey = apiKey;
    this.client = new AlphaVantageApiClient({
      baseUrl: 'https://www.alphavantage.co',
      apiKey: apiKey
    });
  }

  async getGlobalQuote(symbol: string): Promise<StockQuote> {
    // Construir URL con parámetros
    const endpoint = `/query?function=GLOBAL_QUOTE&symbol=${symbol.toUpperCase()}&apikey=${this.apiKey}`;
    
    // Usar el método público
    const data = await this.client.requestPublic<AlphaVantageQuoteResponse>(endpoint);

    if (data.Note || data.Information) {
      throw new Error(data.Note || data.Information || 'Alpha Vantage API limit reached');
    }

    if (data['Error Message']) {
      throw new Error(data['Error Message']);
    }

    const quote = data['Global Quote'];
    if (!quote?.['01. symbol']) {
      throw new Error(`Stock symbol '${symbol.toUpperCase()}' not found`);
    }

    return {
      symbol: quote['01. symbol'],
      price: Number.parseFloat(quote['05. price'] ?? '0'),
      volume: Number.parseInt(quote['06. volume'] ?? '0', 10),
      change: Number.parseFloat(quote['09. change'] ?? '0'),
      changePercent: quote['10. change percent'] ?? '0%',
      latestTradingDay: quote['07. latest trading day'] ?? '',
    };
  }
}