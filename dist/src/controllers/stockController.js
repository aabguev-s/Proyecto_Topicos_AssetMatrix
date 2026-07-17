"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const stockService_1 = require("../services/stockService");
const stockTickerSchema_1 = require("../schemas/stockTickerSchema");
class StockController {
    stockService = new stockService_1.StockService();
    checkNoEmptyResponse(res, result, message, statusCode = 404) {
        if (!result || (Array.isArray(result) && result.length === 0)) {
            res.status(statusCode).json({
                status: 'fail',
                message: message
            });
            return true;
        }
        return false;
    }
    getTrackedDataForSavedTickersDay = async (req, res, next) => {
        try {
            const result = await this.stockService.getTrackedDataForSavedTickersDay();
            if (this.checkNoEmptyResponse(res, result, "No se han encontrado tickers en seguimiento diario."))
                return;
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    getTrackedDataForSavedTickersWeek = async (req, res, next) => {
        try {
            const result = await this.stockService.getTrackedDataForSavedTickersWeek();
            if (this.checkNoEmptyResponse(res, result, "No se han encontrado tickers en seguimiento semanal."))
                return;
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    getTrackedDataForSavedTickersMonth = async (req, res, next) => {
        try {
            const result = await this.stockService.getTrackedDataForSavedTickersMonth();
            if (this.checkNoEmptyResponse(res, result, "No se han encontrado tickers en seguimiento mensual."))
                return;
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    getDataFromCurrentTracked = async (req, res, next) => {
        try {
            const result = await this.stockService.getDataFromCurrentTracked();
            if (this.checkNoEmptyResponse(res, result, `No se han encontrado tickers en seguimiento.`))
                return;
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    getCurrentTickerData = async (req, res, next) => {
        try {
            const symbol = req.params.symbol;
            if (!symbol) {
                res.status(400).json({ status: "fail", message: "Se requiere de un símbolo válido." });
                return;
            }
            const result = await this.stockService.getCurrentTickerData(symbol);
            if (this.checkNoEmptyResponse(res, result, `No se han encontrado tickers con el simbolo ${symbol}.`))
                return;
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    getCurrentTrackedTickerData = async (req, res, next) => {
        try {
            const result = await this.stockService.getCurrentTrackedTickerData();
            if (this.checkNoEmptyResponse(res, result, `No se han encontrado tickers en seguimiento.`))
                return;
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    getAllCurrentTickerData = async (req, res, next) => {
        try {
            const symbol = req.params.symbol;
            if (!symbol) {
                res.status(400).json({ status: "fail", message: "Se requiere de un símbolo válido." });
                return;
            }
            const result = await this.stockService.getAllCurrentTickerData(symbol);
            if (this.checkNoEmptyResponse(res, result, `No se han encontrado tickers con el simbolo ${symbol}.`))
                return;
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    getHistoricTrendsTracked = async (req, res, next) => {
        try {
            const result = await this.stockService.getHistoricTrendsTracked();
            if (this.checkNoEmptyResponse(res, result, `No se han encontrado tickers en seguimiento.`))
                return;
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    getAllCurrentTrackedTickerData = async (req, res, next) => {
        try {
            const result = await this.stockService.getAllCurrentTrackedTickerData();
            if (this.checkNoEmptyResponse(res, result, `No se han encontrado tickers en seguimiento.`))
                return;
            res.status(200).json(result);
        }
        catch (error) {
            next(error);
        }
    };
    startTrackingTicker = async (req, res, next) => {
        try {
            const symbol = req.body.symbol;
            if (!symbol) {
                res.status(400).json({ status: "fail", message: "Se requiere de un símbolo válido." });
                return;
            }
            const raw = await this.stockService.startTrackingTicker(symbol);
            if (this.checkNoEmptyResponse(res, raw, `No se han encontrado activos bursátiles con el simbolo ${symbol}.`, 406))
                return;
            const processed = stockTickerSchema_1.trackingSummaryResponseSchema.parse(raw);
            res.status(201).json({
                success: true,
                message: `Se ha comenzado a seguir el activo: ${symbol}`,
                data: processed,
            });
        }
        catch (error) {
            next(error);
        }
    };
    searchByKeyword = async (req, res, next) => {
        try {
            const keyword = req.params.keyword;
            if (!keyword) {
                res.status(400).json({ status: "fail", message: "Se requiere de una palabra clave válida para la búsqueda." });
                return;
            }
            const data = await this.stockService.searchByKeyword(keyword);
            if (this.checkNoEmptyResponse(res, data, `No se han encontrado activos bursátiles a partir de la palabra clave ${keyword}.`))
                return;
            res.status(200).json({
                status: 'success',
                data: data
            });
        }
        catch (error) {
            next(error);
        }
    };
    getAllDBTrackedTickers = async (req, res, next) => {
        try {
            const data = await this.stockService.getAllDBTrackedTickers();
            if (this.checkNoEmptyResponse(res, data, `No hay tickers en seguimiento`))
                return;
            res.status(200).json({
                status: 'success',
                data: data
            });
        }
        catch (error) {
            next(error);
        }
    };
    removeTickerFromTracking = async (req, res, next) => {
        try {
            const id = req.params.id;
            const deletedTicker = await this.stockService.removeTickerFromTracking(id);
            if (this.checkNoEmptyResponse(res, deletedTicker, `No hay ticker con id: : ${id}`))
                return;
            res.status(200).json({
                status: 'success',
                message: `Se ha removido del segumiento el ticker de id: ${id}.`,
                data: deletedTicker
            });
        }
        catch (error) {
            next(error);
        }
    };
}
exports.StockController = StockController;
//# sourceMappingURL=stockController.js.map