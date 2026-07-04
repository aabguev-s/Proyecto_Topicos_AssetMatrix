"use strict";
// repositories/cryptoRepository.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoRepository = void 0;
const mongoose_1 = require("mongoose");
const Crypto_1 = require("../models/Crypto");
class CryptoRepository {
    async create(data) {
        return await Crypto_1.Crypto.create(data);
    }
    async findAll() {
        return await Crypto_1.Crypto.find().exec();
    }
    async findById(id) {
        return await Crypto_1.Crypto.findById(id).exec();
    }
    async findBySymbol(symbol) {
        return await Crypto_1.Crypto.findOne({ symbol: symbol.toUpperCase() }).exec();
    }
    async update(id, data) {
        return await Crypto_1.Crypto.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        try {
            if (!mongoose_1.Types.ObjectId.isValid(id)) {
                throw new Error(`El ID proporcionado '${id}' no tiene un formato válido de MongoDB.`);
            }
            const objectId = new mongoose_1.Types.ObjectId(id);
            const result = await Crypto_1.Crypto.updateOne({ "transactions._id": objectId }, { $pull: { transactions: { _id: objectId } } }).exec();
            if (result.matchedCount === 0) {
                throw new Error(`No se encontró ninguna moneda que contenga una transacción con el ID: ${id}`);
            }
            return {};
        }
        catch (error) {
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
}
exports.CryptoRepository = CryptoRepository;
//# sourceMappingURL=cryptoRepository.js.map