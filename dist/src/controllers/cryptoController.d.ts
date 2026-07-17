import { Request, Response } from 'express';
export declare class CryptoController {
    private cryptoService;
    create: (req: Request, res: Response) => Promise<void>;
    getAll: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    getAnalytics: (req: Request, res: Response) => Promise<void>;
    getMarketData: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=cryptoController.d.ts.map