"use strict";
// repositories/cryptoRepository.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoRepository = void 0;
const mongoose_1 = require("mongoose");
const Crypto_1 = require("../models/Crypto");
// Métodos no definitivos. Se ajustarán al integrar las API externas.
class CryptoRepository {
    async create(data) {
        return await Crypto_1.Crypto.create(data);
    }
    async findAll() {
        return await Crypto_1.Crypto.find().exec();
    }
    async findById(id) {
        return await Crypto_1.Crypto.findOne({ id }).exec();
    }
    async update(id, data) {
        return await Crypto_1.Crypto.findOneAndUpdate({ id }, data, { new: true }).exec();
    }
    async delete(id) {
        try {
            // Verificación estricta de formato
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw new Error(`El ID proporcionado '${id}' no tiene un formato válido de MongoDB.`);
            }
            const objectId = new mongoose_1.Types.ObjectId(id);
            // Eliminamos el subdocumento del array usando el operador posicional exacto de Mongo
            const result = await Crypto_1.Crypto.updateOne({ "transactions._id": objectId }, { $pull: { transactions: { _id: objectId } } }).exec();
            // Si no tocó ninguna fila, significa que ese ID de transacción no existe en ninguna moneda
            if (result.matchedCount === 0) {
                throw new Error(`No se encontró ninguna moneda que contenga una transacción con el ID: ${id}`);
            }
            // Retornamos un objeto genérico que no sea null para indicar éxito
            return {};
        }
        catch (error) {
            // Re-lanzamos el error para que llegue al console.error del controlador
            throw error;
        }
    }
    async findAllTransactions() {
        const cryptos = await Crypto_1.Crypto.find().exec();
        let allTransactions = [];
        cryptos.forEach(crypto => {
            if (crypto.transactions && crypto.transactions.length > 0) {
                allTransactions.push(...crypto.transactions);
            }
        });
        return allTransactions;
    }
    // Busca una criptomoneda que coincida con el ID, Nombre o Símbolo
    async findByIdNameOrSymbol(identifier) {
        return await Crypto_1.Crypto.findOne({
            $or: [
                { id: identifier },
                { name: { $regex: new RegExp(`^${identifier}$`, 'i') } }, // Búsqueda insensible a mayúsculas
                { symbol: { $regex: new RegExp(`^${identifier}$`, 'i') } }
            ]
        }).exec();
    }
    async pushTransaction(id, newTransaction) {
        return await Crypto_1.Crypto.findOneAndUpdate({ id }, { $push: { transactions: newTransaction } }, { new: true }).exec();
    }
}
exports.CryptoRepository = CryptoRepository;
//# sourceMappingURL=cryptoRepository.js.map