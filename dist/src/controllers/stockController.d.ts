import { NextFunction, Request, Response } from 'express';
export declare class StockController {
    private stockService;
    private checkNoEmptyResponse;
    getTrackedDataForSavedTickersDay: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTrackedDataForSavedTickersWeek: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getTrackedDataForSavedTickersMonth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getDataFromCurrentTracked: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCurrentTickerData: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getCurrentTrackedTickerData: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllCurrentTickerData: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getHistoricTrendsTracked: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllCurrentTrackedTickerData: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    startTrackingTicker: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    searchByKeyword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAllDBTrackedTickers: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    removeTickerFromTracking: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=stockController.d.ts.map