//services/cryptoService.ts

import { CryptoRepository } from '../repositories/cryptoRepository';
import { ICrypto, ICryptoTransaction } from '../models/Crypto';
import {CryptoApiClient} from '../clients/coingeckoAPIClient';


// Métodos no definitivos. Se ajustarán al integrar las API externas.

export class CryptoService {
  private cryptoRepository = new CryptoRepository();
  private CryptoApiClient = new CryptoApiClient();

// services/cryptoService.ts

  async getCoinQuote(coinId: string) {
    // getCoinMarkets espera el "id" de CoinGecko (ej: 'bitcoin'), no el ticker ('BTC')
    const results = await this.CryptoApiClient.getCoinMarkets('usd', coinId.toLowerCase());
    if (!results || results.length === 0) {
      throw new Error(`No se encontraron datos para el activo '${coinId}' en CoinGecko.`);
    }
    return results[0];
  }
}