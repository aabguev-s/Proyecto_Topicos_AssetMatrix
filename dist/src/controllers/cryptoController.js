"use strict";
//controllers/cryptoController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoController = void 0;
const cryptoService_1 = require("../services/cryptoService");
class CryptoController {
    cryptoService = new cryptoService_1.CryptoService();
    getMarketData = async (req, res) => {
        try {
            const result = await this.cryptoService.getCoinQuote(req.params.coin);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    };
}
exports.CryptoController = CryptoController;
//# sourceMappingURL=cryptoController.js.map