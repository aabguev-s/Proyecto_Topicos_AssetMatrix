//controllers/cryptoController.ts

import { Request, Response } from 'express';
import { CryptoService } from '../services/cryptoService';

export class CryptoController {
  private cryptoService = new CryptoService();

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.body || !req.body.id) {
        throw new Error('El cuerpo de la solicitud debe contener un ID de criptomoneda válido');
      }
      const result = await this.cryptoService.createCrypto(req.body.id, req.body.transaction||null);
      res.status(201).json(result);
    } catch (error: any) {
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

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.cryptoService.getAllCryptos();
      if (!result || (Array.isArray(result) && result.length === 0)) {
        res.status(404).json({ error: 'No hay criptomonedas registradas.' });
        return;
      }
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      // Type assertion added here
      const result = await this.cryptoService.getCryptoById(req.params.coin as string);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      // Type assertion added here
      const result = await this.cryptoService.updateCrypto(req.params.id as string, req.body);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.cryptoService.deleteCrypto(req.params.tx_id as string);
      // 204 No Content (success without body)
      res.status(204).send();
    } catch (error: any) {
      console.error("ERROR REAL OCULTO EN EL BACKEND:", error);
      const msg = String(error.message || 'Cryptocurrency target does not exist');
      if (msg.includes('formato válido') || msg.includes('Formato de id inválido')) {
        res.status(400).json({ error: msg });
        return;
      }
      res.status(404).json({ error: msg });
    }
  };

  getAnalytics = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.cryptoService.getPortfolioAnalytics();
      // Si no hay registros, devolver 404
      if (result && typeof result.totalTransactionsProcessed === 'number' && result.totalTransactionsProcessed === 0) {
        res.status(404).json({ error: 'No hay registros en la base de datos.' });
        return;
      }
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getMarketData = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.cryptoService.getCoinQuote(req.params.coin as string);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}