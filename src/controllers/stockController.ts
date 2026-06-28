import { NextFunction, Request, Response } from 'express';
import { StockService } from '../services/stockService';
import { SymbolOnlyInput } from '../schemas/stockParamsSchema';
import { trackingSummaryResponseSchema } from '../schemas/stockTickerSchema';

export class StockController {
    private stockService = new StockService();

    getTrackedDataForSavedTickersDay = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.stockService.getTrackedDataForSavedTickersDay();
            res.status(200).json(result);
        } catch (error : any) {
            res.status(404).json({error : error.message});
        }
    };

    getTrackedDataForSavedTickersWeek = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.stockService.getTrackedDataForSavedTickersWeek();
            res.status(200).json(result);
        } catch (error : any) {
            res.status(404).json({error : error.message});
        }
    };

    getTrackedDataForSavedTickersMonth = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.stockService.getTrackedDataForSavedTickersMonth();
            res.status(200).json(result);
        } catch (error : any) {
            res.status(404).json({error : error.message});
        }
    };

    getDataFromCurrentTracked = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.stockService.getDataFromCurrentTracked();
            if (!result || result.length == 0) {
                res.status(404).json({
                    success: true,
                    message: `No se han encontrado tickers en seguimiento.`
                });
                return;
            }
            res.status(200).json(result);
        } catch (error : any) {
            next(error);
        }
    };

    getCurrentTickerData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const symbol = req.params.symbol as string;
            if (!symbol) {
                res.status(400).json({ status: "fail", message: "Se requiere de un símbolo válido." });
                return;
            }
            const result = await this.stockService.getCurrentTickerData(symbol);
            if (!result) {
                res.status(404).json({
                    success: true,
                    message: `No se han encontrado tickers con el simbolo ${symbol}.`
                });
                return;
            }
            res.status(200).json(result);
        } catch(error : any){
            next(error);
        }
    }

    getCurrentTrackedTickerData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.stockService.getCurrentTrackedTickerData();
            if (!result || result.length == 0) {
                res.status(404).json({
                    success: true,
                    message: `No se han encontrado tickers en seguimiento.`
                });
                return;
            }
            res.status(200).json(result);
        } catch(error : any){
            next(error);
        }
    }

    getAllCurrentTickerData =async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const symbol = req.params.symbol as string;
            if (!symbol) {
                res.status(400).json({ status: "fail", message: "Se requiere de un símbolo válido." });
                return;
            }
            const result = await this.stockService.getAllCurrentTickerData(symbol);
            if (!result) {
                res.status(404).json({
                    success: true,
                    message: `No se han encontrado tickers con el simbolo ${symbol}.`
                });
                return;
            }
            res.status(200).json(result);
        } catch(error : any){
            next(error);
        }
    }

    getHistoricTrendsTracked = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.stockService.getHistoricTrendsTracked();
            if (!result || result.length == 0) {
                res.status(404).json({
                    success: true,
                    message: `No se han encontrado tickers en seguimiento.`
                });
                return;
            }
            res.status(200).json(result);
        } catch (error : any) {
            next(error);
        }
    }

    getAllCurrentTrackedTickerData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const result = await this.stockService.getAllCurrentTrackedTickerData();
            if (!result || result.length == 0) {
                res.status(404).json({
                    success: true,
                    message: `No se han encontrado tickers en seguimiento.`
                });
                return;
            }
            res.status(200).json(result);
        } catch(error : any){
            next(error);
        }
    }

    startTrackingTicker = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const symbol = req.body.symbol as string; 
            if (!symbol) {
                res.status(400).json({ status: "fail", message: "Se requiere de un símbolo válido." });
                return;
            }
            const raw = await this.stockService.startTrackingTicker(symbol);
            if (!raw) {
                res.status(406).json({
                    status: 'fail',
                    message: `No se han encontrado activos bursátiles con el simbolo ${symbol}.`
                });
                return
            };
            const processed = trackingSummaryResponseSchema.parse(raw);
            res.status(201).json({ 
                success: true, 
                message: `Se ha comenzado a seguir el activo: ${symbol}` ,
                data: processed,
            });
        } catch (error: any) {
            next(error);
        }
    };

    searchByKeyword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const keyword = req.params.keyword as string;
            if (!keyword) {
                res.status(400).json({ status: "fail", message: "Se requiere de una palabra clave válida para la búsqueda." });
                return;
            }
            const data = await this.stockService.searchByKeyword(keyword);
            if (!data || data.length == 0) {
                res.status(404).json({
                status: 'fail',
                message: `No se han encontrado activos bursátiles a partir de la palabra clave ${keyword}.`
            });
            return
            };
            res.status(200).json({
                status: 'success',
                data: data
            });
        } catch (error) {
            next(error);
        }
    }

    getAllDBTrackedTickers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = await this.stockService.getAllDBTrackedTickers();

            if (!data || data.length == 0) {
                res.status(404).json({
                status: 'fail',
                message: `No hay tickers en seguimiento`
            });
            return
            };
            res.status(200).json({
                status: 'success',
                data: data
            });
        } catch (error) {
            next(error);
        }
    }

    removeTickerFromTracking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id as string;
            const deletedTicker = await this.stockService.removeTickerFromTracking(id);

            if (!deletedTicker) {
                res.status(404).json({
                status: 'fail',
                message: `No hay ticker con id: : ${id}`
            });
            return;
          }
      
        res.status(200).json({
            status: 'success',
            message: `Se ha removido del segumiento el ticker de id: ${id}.`,
            data: deletedTicker
          });
        } catch (error) {
            next(error);
        }
    };
}