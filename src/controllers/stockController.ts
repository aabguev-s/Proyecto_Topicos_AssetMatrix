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

    getDataFromCurrentTracked = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.stockService.getDataFromCurrentTracked();
            res.status(200).json(result);
        } catch (error : any) {
            res.status(404).json({error: error.message});
        }
    };

    getCurrentTickerData = async (req: Request, res: Response): Promise<void> => {
        try {
            const symbol = req.params.symbol as string;
            if (!symbol) {
                res.status(400).json({ status: "fail", message: "Se requiere de un símbolo válido." });
                return;
            }
            const result = await this.stockService.getCurrentTickerData(symbol);
            res.status(200).json(result);
        } catch(error : any){
            res.status(404).json({error: error.message});
        }
    }

    getCurrentTrackedTickerData = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.stockService.getCurrentTrackedTickerData();
            res.status(200).json(result);
        } catch(error : any){
            res.status(404).json({error: error.message});
        }
    }

    getAllCurrentTickerData =async (req: Request, res: Response): Promise<void> => {
        try {
            const symbol = req.params.symbol as string;
            if (!symbol) {
                res.status(400).json({ status: "fail", message: "Se requiere de un símbolo válido." });
                return;
            }
            const result = await this.stockService.getAllCurrentTickerData(symbol);
            res.status(200).json(result);
        } catch(error : any){
            res.status(404).json({error: error.message});
        }
    }

    getHistoricTrendsTracked = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.stockService.getHistoricTrendsTracked();
            res.status(200).json(result);
        } catch (error : any) {
            res.status(404).json({error: error.message});
        }
    }

    getAllCurrentTrackedTickerData = async (req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.stockService.getAllCurrentTrackedTickerData();
            res.status(200).json(result);
        } catch(error : any){
            res.status(404).json({error: error.message});
        }
    }

    startTrackingTicker = async (req: Request, res: Response): Promise<void> => {
        try {
            const symbol = req.body.symbol as string; 
            if (!symbol) {
                res.status(400).json({ status: "fail", message: "Se requiere de un símbolo válido." });
                return;
            }
            const raw = await this.stockService.startTrackingTicker(symbol);
            const processed = trackingSummaryResponseSchema.parse(raw);
            res.status(201).json({ 
                success: true, 
                message: `Se ha comenzado a seguir el activo: ${symbol}` ,
                data: processed,
            });
        } catch (error: any) {
            res.status(406).json({ error: error.message });
        }
    };

    removeTickerFromTracking = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = req.params.id as string;
            const symbol = (req.body?.symbol || undefined) as string | undefined;
            await this.stockService.removeTickerFromTracking(id, symbol);
            res.status(204).send(); 
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
}   ;
}