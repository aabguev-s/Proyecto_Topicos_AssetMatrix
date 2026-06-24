import { Request, Response } from 'express';
export declare class StockController {
    private stockService;
    getQuote: (req: Request, res: Response) => Promise<void>;
    addToWatchlist: (req: Request, res: Response) => Promise<void>;
    getWatchlist: (_req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=stockController.d.ts.map