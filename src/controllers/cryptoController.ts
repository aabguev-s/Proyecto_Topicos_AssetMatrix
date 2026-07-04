//controllers/cryptoController.ts

import { Request, Response } from 'express';
import { CryptoService } from '../services/cryptoService';

export class CryptoController {
  private cryptoService = new CryptoService();

  getMarketData = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.cryptoService.getCoinQuote(req.params.coin as string);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  };
}