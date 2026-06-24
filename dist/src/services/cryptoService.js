"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const cryptoRepository_1 = require("../repositories/cryptoRepository");
// Métodos no definitivos. Se ajustarán al integrar las API externas.
class CryptoService {
    cryptoRepository = new cryptoRepository_1.CryptoRepository();
    async createCrypto(data) {
        if (data.symbol)
            data.symbol = data.symbol.toUpperCase();
        return await this.cryptoRepository.create(data);
    }
    async getAllCryptos() {
        return await this.cryptoRepository.findAll();
    }
    async getCryptoById(id) {
        const crypto = await this.cryptoRepository.findById(id);
        if (!crypto)
            throw new Error('Cryptocurrency asset not found');
        return crypto;
    }
    async updateCrypto(id, data) {
        if (data.symbol)
            data.symbol = data.symbol.toUpperCase();
        const updatedCrypto = await this.cryptoRepository.update(id, data);
        if (!updatedCrypto)
            throw new Error('Cryptocurrency target does not exist');
        return updatedCrypto;
    }
    async deleteCrypto(id) {
        const deleted = await this.cryptoRepository.delete(id);
        if (!deleted)
            throw new Error('Cryptocurrency target does not exist');
    }
}
exports.CryptoService = CryptoService;
//# sourceMappingURL=cryptoService.js.map