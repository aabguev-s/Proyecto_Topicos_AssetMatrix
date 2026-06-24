"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoRepository = void 0;
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
        return await Crypto_1.Crypto.findById(id).exec();
    }
    async update(id, data) {
        return await Crypto_1.Crypto.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        return await Crypto_1.Crypto.findByIdAndDelete(id).exec();
    }
}
exports.CryptoRepository = CryptoRepository;
//# sourceMappingURL=cryptoRepository.js.map