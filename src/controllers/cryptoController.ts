import { Request, Response } from 'express';
import { CryptoService } from '../services/cryptoService';

export class CryptoController {
  private cryptoService = new CryptoService();

      //Métodos de Prueba. No van a la versión final.

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.cryptoService.createCrypto(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  };

  getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.cryptoService.getAllCryptos();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    try {
      // Type assertion added here
      const result = await this.cryptoService.getCryptoById(req.params.id as string);
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
      // Type assertion added here
      await this.cryptoService.deleteCrypto(req.params.id as string);
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}