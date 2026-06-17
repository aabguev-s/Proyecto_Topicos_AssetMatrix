import { CryptoRepository } from '../repositories/cryptoRepository';
import { ICrypto } from '../models/Crypto';

// Métodos no definitivos. Se ajustarán al integrar las API externas.

export class CryptoService {
  private cryptoRepository = new CryptoRepository();

  async createCrypto(data: Partial<ICrypto>): Promise<ICrypto> {
    if (data.symbol) data.symbol = data.symbol.toUpperCase();
    return await this.cryptoRepository.create(data);
  }

  async getAllCryptos(): Promise<ICrypto[]> {
    return await this.cryptoRepository.findAll();
  }

  async getCryptoById(id: string): Promise<ICrypto> {
    const crypto = await this.cryptoRepository.findById(id);
    if (!crypto) throw new Error('Cryptocurrency asset not found');
    return crypto;
  }

  async updateCrypto(id: string, data: Partial<ICrypto>): Promise<ICrypto> {
    if (data.symbol) data.symbol = data.symbol.toUpperCase();
    const updatedCrypto = await this.cryptoRepository.update(id, data);
    if (!updatedCrypto) throw new Error('Cryptocurrency target does not exist');
    return updatedCrypto;
  }

  async deleteCrypto(id: string): Promise<void> {
    const deleted = await this.cryptoRepository.delete(id);
    if (!deleted) throw new Error('Cryptocurrency target does not exist');
  }
}