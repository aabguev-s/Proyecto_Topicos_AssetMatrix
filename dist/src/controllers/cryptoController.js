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
            const msg = String(error.message || '');
            if (msg.includes('No se pudo obtener información') || msg.includes('CoinGecko') || msg.includes("No se encontraron datos")) {
                res.status(404).json({ error: msg });
                return;
            }
            if (msg.includes('El cuerpo de la solicitud')) {
                res.status(400).json({ error: msg });
                return;
            }
            // Fallback a 500 para errores inesperados
            res.status(500).json({ error: msg });
            return;
        }
    };
    getAll = async (req, res) => {
        try {
            const result = await this.cryptoService.getAllCryptos();
            if (!result || (Array.isArray(result) && result.length === 0)) {
                res.status(404).json({ error: 'No hay criptomonedas registradas.' });
                return;
            }
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
            // 204 No Content (success without body)
            res.status(204).send();
        }
        catch (error) {
            console.error("ERROR REAL OCULTO EN EL BACKEND:", error);
            const msg = String(error.message || 'Cryptocurrency target does not exist');
            if (msg.includes('formato válido') || msg.includes('Formato de id inválido')) {
                res.status(400).json({ error: msg });
                return;
            }
            res.status(404).json({ error: msg });
        }
    };
    getAnalytics = async (req, res) => {
        try {
            const result = await this.cryptoService.getPortfolioAnalytics();
            // Si no hay registros, devolver 404
            if (result && typeof result.totalTransactionsProcessed === 'number' && result.totalTransactionsProcessed === 0) {
                res.status(404).json({ error: 'No hay registros en la base de datos.' });
                return;
            }
            res.status(200).json({ success: true, data: result });
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