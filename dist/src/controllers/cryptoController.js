"use strict";
//controllers/cryptoController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoController = void 0;
const cryptoService_1 = require("../services/cryptoService");
class CryptoController {
    cryptoService = new cryptoService_1.CryptoService();
    create = async (req, res) => {
        try {
            if (!req.body || !req.body.id) {
                throw new Error('El cuerpo de la solicitud debe contener un ID de criptomoneda válido');
            }
            const result = await this.cryptoService.createCrypto(req.body.id, req.body.transaction || null);
            res.status(201).json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
    getAll = async (req, res) => {
        try {
            const result = await this.cryptoService.getAllCryptos();
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
    getById = async (req, res) => {
        try {
            // Type assertion added here
            const result = await this.cryptoService.getCryptoById(req.params.coin);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    };
    update = async (req, res) => {
        try {
            // Type assertion added here
            const result = await this.cryptoService.updateCrypto(req.params.id, req.body);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    };
    delete = async (req, res) => {
        try {
            const result = await this.cryptoService.deleteCrypto(req.params.tx_id);
            res.status(204).json({ message: 'Se ha eliminado el registro', data: result });
        }
        catch (error) {
            // ESTO ES CRUCIAL: Imprime el error real en tu terminal de VS Code / Docker
            console.error("ERROR REAL OCULTO EN EL BACKEND:", error);
            res.status(404).json({
                error: 'Cryptocurrency target does not exist',
                debugMessage: error.message // Te lo mando también en el JSON para que lo leas en Swagger
            });
        }
    };
    getAnalytics = async (req, res) => {
        try {
            const result = await this.cryptoService.getPortfolioAnalytics();
            res.status(200).json({
                success: true,
                data: result
            });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
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