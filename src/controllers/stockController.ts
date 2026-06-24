import { Request, Response } from 'express';
import { StockService } from '../services/stockService';

export class StockController {
  private stockService = new StockService();

  getQuote = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.stockService.getStockQuote(req.params.symbol as string);
      res.status(200).json(result);
    } catch (error: any) {
      const message = error.message as string;

      if (message.includes('not found')) {
        res.status(404).json({ error: message });
        return;
      }

      res.status(500).json({ error: message || 'External API connection error' });
    }
  };

  addToWatchlist = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.stockService.addToWatchlist(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      const message = error.message as string;

      if (/exist|duplicate|already in watchlist|already exists/i.test(message)) {
        res.status(409).json({ error: message });
        return;
      }

      res.status(500).json({ error: message || 'Failed to save stock to watchlist' });
    }
  };

  getWatchlist = async (_req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.stockService.getWatchlist();
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message || 'Failed to retrieve watchlist' });
    }
  };
}
