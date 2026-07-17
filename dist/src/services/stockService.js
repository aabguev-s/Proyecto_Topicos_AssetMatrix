"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockService = void 0;
const alphavantageAPIClient_1 = require("../clients/alphavantageAPIClient");
const stockTickerRepository_1 = require("../repositories/stockTickerRepository");
class StockService {
    stockRepository = new stockTickerRepository_1.StockTickerRepository();
    stockApiClient = new alphavantageAPIClient_1.StockApiClient();
    async getTrackedDataForSavedTickersDay() {
        const tracked = await this.stockRepository.getAllCurrentTickersSymbol();
        if (!tracked || tracked.length == 0)
            return [];
        const promise = tracked.map((ticker) => this.stockApiClient.getGlobalEquityDaily(ticker.valueOf()));
        return await Promise.all(promise);
    }
    async getTrackedDataForSavedTickersWeek() {
        const tracked = await this.stockRepository.getAllCurrentTickersSymbol();
        if (!tracked || tracked.length == 0)
            return [];
        const promise = tracked.map((ticker) => this.stockApiClient.getGlobalEquityWeekly(ticker.valueOf()));
        return await Promise.all(promise);
    }
    async getTrackedDataForSavedTickersMonth() {
        const tracked = await this.stockRepository.getAllCurrentTickersSymbol();
        if (!tracked || tracked.length == 0)
            return [];
        const promise = tracked.map((ticker) => this.stockApiClient.getGlobalEquityMonthly(ticker.valueOf()));
        return await Promise.all(promise);
    }
    async getDataFromCurrentTracked() {
        return await this.stockRepository.getAllCurrentTickers();
    }
    async getTrackedDataForTickerDay(symbol) {
        return await this.stockApiClient.getGlobalEquityDaily(symbol);
    }
    async getTrackedDataForTickerWeek(symbol) {
        return await this.stockApiClient.getGlobalEquityWeekly(symbol);
    }
    async getTrackedDataForTickerMonth(symbol) {
        return await this.stockApiClient.getGlobalEquityMonthly(symbol);
    }
    async searchByKeyword(keyword) {
        return await this.stockApiClient.getSymbolSearch(keyword);
    }
    async getCurrentTickerData(symbol) {
        const dayRaw = await this.getTrackedDataForTickerDay(symbol);
        const weekRaw = await this.getTrackedDataForTickerWeek(symbol);
        const monthRaw = await this.getTrackedDataForTickerMonth(symbol);
        const day = dayRaw.timeSeries[0];
        const week = weekRaw.timeSeries[0];
        const month = monthRaw.timeSeries[0];
        return {
            symbol: symbol,
            daily: day ? [day] : [],
            weekly: week ? [week] : [],
            monthly: month ? [month] : [],
        };
    }
    async getCurrentTrackedTickerData() {
        const dayRaw = await this.getTrackedDataForSavedTickersDay();
        const weekRaw = await this.getTrackedDataForSavedTickersWeek();
        const monthRaw = await this.getTrackedDataForSavedTickersMonth();
        const totalTickers = Math.min(dayRaw.length, weekRaw.length, monthRaw.length);
        const response = [];
        for (let i = 0; i < totalTickers; i++) {
            let tickerDay = dayRaw[i];
            let tickerWeek = weekRaw[i];
            let tickerMonth = monthRaw[i];
            if (tickerDay?.timeSeries?.[0] &&
                tickerWeek?.timeSeries?.[0] &&
                tickerMonth?.timeSeries?.[0]) {
                let dayData = tickerDay.timeSeries[0];
                let weekData = tickerWeek.timeSeries[0];
                let monthData = tickerMonth.timeSeries[0];
                response.push({
                    symbol: tickerDay.symbol,
                    daily: [dayData],
                    weekly: [weekData],
                    monthly: [monthData],
                });
            }
        }
        return response;
    }
    async getAllCurrentTickerData(symbol) {
        const dayRaw = await this.getTrackedDataForTickerDay(symbol);
        const weekRaw = await this.getTrackedDataForTickerWeek(symbol);
        const monthRaw = await this.getTrackedDataForTickerMonth(symbol);
        const day = dayRaw.timeSeries;
        const week = weekRaw.timeSeries;
        const month = monthRaw.timeSeries;
        return {
            symbol: symbol,
            daily: day,
            weekly: week,
            monthly: month,
        };
    }
    async getAllCurrentTrackedTickerData() {
        const dayRaw = await this.getTrackedDataForSavedTickersDay();
        const weekRaw = await this.getTrackedDataForSavedTickersWeek();
        const monthRaw = await this.getTrackedDataForSavedTickersMonth();
        const totalTickers = Math.min(dayRaw.length, weekRaw.length, monthRaw.length);
        const response = [];
        for (let i = 0; i < totalTickers; i++) {
            let tickerDay = dayRaw[i];
            let tickerWeek = weekRaw[i];
            let tickerMonth = monthRaw[i];
            if (tickerDay?.timeSeries?.[0] &&
                tickerWeek?.timeSeries?.[0] &&
                tickerMonth?.timeSeries?.[0]) {
                let dayData = tickerDay.timeSeries;
                let weekData = tickerWeek.timeSeries;
                let monthData = tickerMonth.timeSeries;
                response.push({
                    symbol: tickerDay.symbol,
                    daily: dayData,
                    weekly: weekData,
                    monthly: monthData,
                });
            }
        }
        return response;
    }
    async getHistoricTrendsTracked() {
        const tracked = await this.stockRepository.getAllCurrentTickersSymbol();
        const seriesWeek = await this.getTrackedDataForSavedTickersWeek();
        const sma = await Promise.all(tracked.map((symbol) => this.stockApiClient.getTickerSMA(symbol)));
        const rsi = await Promise.all(tracked.map((symbol) => this.stockApiClient.getTickerRSI(symbol)));
        const response = [];
        for (let i = 0; i < seriesWeek.length; i++) {
            let tickerWeek = seriesWeek[i];
            if (!tickerWeek || !tickerWeek.timeSeries || tickerWeek.timeSeries.length < 2) {
                continue;
            }
            let currentWeek = tickerWeek.timeSeries[0];
            let previousWeek = tickerWeek.timeSeries[1];
            let percentageChange = ((currentWeek.close - previousWeek.close) / previousWeek.close) * 100;
            let volatility = ((currentWeek.high - currentWeek.low) / currentWeek.low) * 100;
            let averageVolumeRaw = tickerWeek.timeSeries.slice(1, 21);
            let sumAverageVolume = averageVolumeRaw.reduce((acc, unit) => acc + unit.volume, 0);
            let averageVolume = averageVolumeRaw.length > 0 ? sumAverageVolume / averageVolumeRaw.length : 1;
            let volumeVsAverage = currentWeek.volume / averageVolume;
            let currentSymbol = tickerWeek.symbol;
            let technicalSma = sma.find(s => s.symbol === currentSymbol);
            let technicalRsi = rsi.find(r => r.symbol === currentSymbol);
            let smaValue = technicalSma && technicalSma.data[0] ? technicalSma.data[0].SMA : currentWeek?.close;
            let rsiValue = technicalRsi && technicalRsi.data[0] ? technicalRsi.data[0].RSI : 50;
            let isBullish = currentWeek && smaValue ? currentWeek.close > smaValue : false;
            let volatilityStatus = volatility > 5 ? "overbought" : volatility < 1.5 ? "oversold" : "normal";
            response.push({
                symbol: currentSymbol,
                trends: {
                    weekly: {
                        price: currentWeek.close,
                        performance: {
                            percentageChange: parseFloat(percentageChange.toFixed(2)),
                            isBullish: isBullish,
                            volatilityStatus: volatilityStatus,
                            volumeVsAverage: parseFloat(volumeVsAverage.toFixed(2)),
                        },
                        indicators: {
                            rsi: parseFloat(rsiValue.toFixed(2)),
                            sma: parseFloat(smaValue.toFixed(2)),
                        }
                    }
                }
            });
        }
        return response;
    }
    ;
    async getAllDBTrackedTickers() {
        return await this.stockRepository.getAllCurrentTickers();
    }
    async startTrackingTicker(symbol) {
        const matches = await this.stockApiClient.getSymbolSearch(symbol);
        const trackedTickers = [];
        let ignoredCount = 0;
        if (matches && matches.length > 0) {
            for (const unit of matches) {
                if (parseFloat(unit.score) > 0.6) {
                    const newTicker = {
                        name: unit.name,
                        symbol: unit.symbol,
                        type: unit.type,
                        region: unit.region,
                        currency: unit.currency,
                    };
                    try {
                        await this.stockRepository.createTickerTracker(newTicker);
                        trackedTickers.push({ symbol: unit.symbol, name: unit.name });
                    }
                    catch (dbError) {
                        if (dbError.code === 11000) {
                            console.log(`Ticker ${unit.symbol} ya se encuentra bajo seguimiento.`);
                            trackedTickers.push({ symbol: unit.symbol, name: `${unit.name} (Ya registrado)` });
                        }
                        else {
                            throw dbError;
                        }
                    }
                }
                else {
                    ignoredCount++;
                }
            }
        }
        return {
            searchKeyword: symbol,
            totalMatchesFound: matches.length,
            trackedCount: trackedTickers.length,
            trackedTickers: trackedTickers,
            ignoredCount: ignoredCount
        };
    }
    async removeTickerFromTracking(id, symbol) {
        return await this.stockRepository.removeTickerTracker(id, symbol);
    }
}
exports.StockService = StockService;
//# sourceMappingURL=stockService.js.map