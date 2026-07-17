import { Types } from 'mongoose';
import { Crypto, ICrypto, ICryptoTransaction, } from '../models/Crypto';
  
export class CryptoRepository {
  async create(data: Partial<ICrypto>): Promise<ICrypto> {
    return await Crypto.create(data);
  }

  async findAll(): Promise<ICrypto[]> {
    return await Crypto.find().exec();
  }

  async findById(id: string): Promise<ICrypto | null> {
    return await Crypto.findOne({ id }).exec();
  }

  async update(id: string, data: Partial<ICrypto>): Promise<ICrypto | null> {
    return await Crypto.findOneAndUpdate({ id }, data, { new: true }).exec();
  }

  async delete(id: string): Promise<ICrypto | null> {
    try {
      // Verificación estricta de formato
      if (!Types.ObjectId.isValid(id)) {
        throw new Error(`El ID proporcionado '${id}' no tiene un formato válido de MongoDB.`);
      }
      
      const objectId = new Types.ObjectId(id);

      // Eliminamos el subdocumento del array usando el operador posicional exacto de Mongo
      const result = await Crypto.updateOne(
        { "transactions._id": objectId }, 
        { $pull: { transactions: { _id: objectId } } }
      ).exec();

      // Si no tocó ninguna fila, significa que ese ID de transacción no existe en ninguna moneda
      if (result.matchedCount === 0) {
        throw new Error(`No se encontró ninguna moneda que contenga una transacción con el ID: ${id}`);
      }

      // Retornamos un objeto genérico que no sea null para indicar éxito
      return {} as ICrypto;
    } catch (error: any) {
      // Re-lanzamos el error para que llegue al console.error del controlador
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

  // Busca una criptomoneda que coincida con el ID, Nombre o Símbolo
  async findByIdNameOrSymbol(identifier: string): Promise<ICrypto | null> {
    return await Crypto.findOne({
      $or: [
        { id: identifier },
        { name: { $regex: new RegExp(`^${identifier}$`, 'i') } }, // Búsqueda insensible a mayúsculas
        { symbol: { $regex: new RegExp(`^${identifier}$`, 'i') } }
      ]
    }).exec();
  }

  async pushTransaction(id: string, newTransaction: ICryptoTransaction): Promise<ICrypto | null> {
    return await Crypto.findOneAndUpdate(
      { id },
      { $push: { transactions: newTransaction } },
      { new: true }
    ).exec();
  }
}