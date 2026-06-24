"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoController = void 0;
const cryptoService_1 = require("../services/cryptoService");
class CryptoController {
    cryptoService = new cryptoService_1.CryptoService();
    //Métodos de Prueba. No van a la versión final.
    create = async (req, res) => {
        try {
            const result = await this.cryptoService.createCrypto(req.body);
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
            const result = await this.cryptoService.getCryptoById(req.params.id);
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
            // Type assertion added here
            await this.cryptoService.deleteCrypto(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    };
}
exports.CryptoController = CryptoController;
//# sourceMappingURL=cryptoController.js.map