// repositories/cryptoRepository.ts

import { Types } from 'mongoose';
import { Crypto, ICrypto, ICryptoTransaction } from '../models/Crypto';

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

  async findBySymbol(symbol: string): Promise<ICrypto | null> {
    return await Crypto.findOne({ symbol: symbol.toUpperCase() }).exec();
  }

  async update(id: string, data: Partial<ICrypto>): Promise<ICrypto | null> {
    return await Crypto.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<ICrypto | null> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new Error(`El ID proporcionado '${id}' no tiene un formato válido de MongoDB.`);
      }

      const objectId = new Types.ObjectId(id);

      const result = await Crypto.updateOne(
        { "transactions._id": objectId },
        { $pull: { transactions: { _id: objectId } } }
      ).exec();

      if (result.matchedCount === 0) {
        throw new Error(`No se encontró ninguna moneda que contenga una transacción con el ID: ${id}`);
      }

      return {} as ICrypto;
    } catch (error: any) {
      throw error;
    }
  }

  async findAllTransactions(): Promise<ICryptoTransaction[]> {
    const cryptos = await Crypto.find().exec();
    let allTransactions: ICryptoTransaction[] = [];
    cryptos.forEach(crypto => {
      if (crypto.transactions && crypto.transactions.length > 0) {
        allTransactions.push(...(crypto.transactions as ICryptoTransaction[]));
      }
    });
    return allTransactions;
  }
}