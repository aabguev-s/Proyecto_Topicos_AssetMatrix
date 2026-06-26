import { Crypto, ICrypto } from '../models/Crypto';

// Métodos no definitivos. Se ajustarán al integrar las API externas.
  
export class CryptoRepository {
  async create(data: Partial<ICrypto>): Promise<ICrypto> {
    return await Crypto.create(data);
  }

  async findAll(): Promise<ICrypto[]> {
    return await Crypto.find().exec();
  }

  async findById(id: string): Promise<ICrypto | null> {
    return await Crypto.findById(id).exec();
  }

  async update(id: string, data: Partial<ICrypto>): Promise<ICrypto | null> {
    return await Crypto.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<ICrypto | null> {
    return await Crypto.findByIdAndDelete(id).exec();
  }
}