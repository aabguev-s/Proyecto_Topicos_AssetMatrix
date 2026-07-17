import { StockApiClient } from "../clients/alphavantageAPIClient";
import { IStockTicker, IStockTickerInput } from "../models/StockTicker";
import { StockTickerRepository } from "../repositories/stockTickerRepository";
import { StockSeriesResponse, SymbolSearchResponse, SeriesDataReturnPacked, StockHistory, TrackingSummaryResponse } from "../models/StockDataManagement";

export class StockService {
    private stockRepository = new StockTickerRepository();
    private stockApiClient = new StockApiClient();

    // Retorna los datos diarios, semanales y mensuales de todos los tickers guardados en la base de datos
    async getTrackedDataForSavedTickersDay(): Promise<StockSeriesResponse[]> {
        const tracked : String[] = await this.stockRepository.getAllCurrentTickersSymbol();
        if (!tracked || tracked.length == 0) return [];
        const results: StockSeriesResponse[] = [];
        for (const ticker of tracked) {
            const result = await this.stockApiClient.getGlobalEquityDaily(ticker.valueOf());
            results.push(result);
        }
        return results;
    }

    async getTrackedDataForSavedTickersWeek(): Promise<StockSeriesResponse[]> {
        const tracked = await this.stockRepository.getAllCurrentTickersSymbol();
        if (!tracked || tracked.length == 0) return [];
        const results: StockSeriesResponse[] = [];
        for (const ticker of tracked) {
            const result = await this.stockApiClient.getGlobalEquityWeekly(ticker.valueOf());
            results.push(result);
        }
        return results;
    }

    async getTrackedDataForSavedTickersMonth(): Promise<StockSeriesResponse[]> {
        const tracked : String[] = await this.stockRepository.getAllCurrentTickersSymbol();
        if (!tracked || tracked.length == 0) return [];
        const results: StockSeriesResponse[] = [];
        for (const ticker of tracked) {
            const result = await this.stockApiClient.getGlobalEquityMonthly(ticker.valueOf());
            results.push(result);
        }
        return results;
    }

    // Retorna los activos en seguimiento registrados en la base de datos
    async getAllDBTrackedTickers(): Promise<IStockTicker[]> {
        return await this.stockRepository.getAllCurrentTickers();
    }

    // Retorna los datos diarios, semanales y mensuales de un ticker específico
    async getTrackedDataForTickerDay(symbol : string): Promise<StockSeriesResponse>{
        return await this.stockApiClient.getGlobalEquityDaily(symbol);        
    }

    async getTrackedDataForTickerWeek(symbol : string): Promise<StockSeriesResponse>{
        return await this.stockApiClient.getGlobalEquityWeekly(symbol);        
    }

    async getTrackedDataForTickerMonth(symbol : string): Promise<StockSeriesResponse>{
        return await this.stockApiClient.getGlobalEquityMonthly(symbol);        
    }

    // Retorna los datos de búsqueda de un ticker específico. El parametro keyword representa cualquier cadena de texto que pueda coincidir con el nombre o símbolo del activo bursátil.
    async searchByKeyword(keyword: string): Promise<SymbolSearchResponse[]> {
        return await this.stockApiClient.getSymbolSearch(keyword);
    }

    // Retorna los datos diarios, semanales y mensuales de un ticker específico, empaquetados en un objeto SeriesDataReturnPacked
    async getCurrentTickerData(symbol : string): Promise<SeriesDataReturnPacked>{
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
        }
    }

    // Retorna los datos diarios, semanales y mensuales de todos los tickers guardados en la base de datos, empaquetados en un arreglo de objetos SeriesDataReturnPacked (Este método se puede ver afectado por el limite de la apikey básica de alpha vantage)
    async getCurrentTrackedTickerData(): Promise<SeriesDataReturnPacked[]>{
        const dayRaw = await this.getTrackedDataForSavedTickersDay();
        const weekRaw = await this.getTrackedDataForSavedTickersWeek();
        const monthRaw = await this.getTrackedDataForSavedTickersMonth();
        const totalTickers = Math.min(dayRaw.length, weekRaw.length, monthRaw.length);
        const response : SeriesDataReturnPacked[] = [];
        for (let i = 0; i < totalTickers; i++){
            let tickerDay = dayRaw[i];
            let tickerWeek = weekRaw[i];
            let tickerMonth = monthRaw[i];
            if (
                tickerDay?.timeSeries?.[0] &&
                tickerWeek?.timeSeries?.[0] &&
                tickerMonth?.timeSeries?.[0]
            ) {
                let dayData = tickerDay.timeSeries[0];
                let weekData = tickerWeek.timeSeries[0];
                let monthData = tickerMonth.timeSeries[0];
                response.push({
                    symbol: tickerDay.symbol,
                    daily: [dayData],
                    weekly: [weekData],
                    monthly: [monthData],
                })
            }
        }
        return response;
    }

    // Retorna los datos diarios, semanales y mensuales de un ticker específico, empaquetados en un objeto SeriesDataReturnPacked
    async getAllCurrentTickerData(symbol : string): Promise<SeriesDataReturnPacked>{
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
        }
    }

    // Retorna los datos diarios, semanales y mensuales de todos los tickers guardados en la base de datos, empaquetados en un arreglo de objetos SeriesDataReturnPacked (Este método se puede ver afectado por el limite de la apikey básica de alpha vantage)
    async getAllCurrentTrackedTickerData(): Promise<SeriesDataReturnPacked[]>{
        const dayRaw = await this.getTrackedDataForSavedTickersDay();
        const weekRaw = await this.getTrackedDataForSavedTickersWeek();
        const monthRaw = await this.getTrackedDataForSavedTickersMonth();
        const totalTickers = Math.min(dayRaw.length, weekRaw.length, monthRaw.length);
        const response : SeriesDataReturnPacked[] = [];
        for (let i = 0; i < totalTickers; i++){
            let tickerDay = dayRaw[i];
            let tickerWeek = weekRaw[i];
            let tickerMonth = monthRaw[i];
            if (
                tickerDay?.timeSeries?.[0] &&
                tickerWeek?.timeSeries?.[0] &&
                tickerMonth?.timeSeries?.[0]
            ) {
                let dayData = tickerDay.timeSeries;
                let weekData = tickerWeek.timeSeries;
                let monthData = tickerMonth.timeSeries;
                response.push({
                    symbol: tickerDay.symbol,
                    daily: dayData,
                    weekly: weekData,
                    monthly: monthData,
                })
            }
        }
        return response;
    }

    // Retorna un resumen de los tickers en seguimiento, incluyendo el porcentaje de cambio, si está en alta o baja, el estado de volatilidad y el volumen comparado con el promedio (Este método se puede ver afectado por el limite de la apikey básica de alpha vantage)
    async getHistoricTrendsTracked(): Promise<StockHistory[]>{
        const tracked : String[] = await this.stockRepository.getAllCurrentTickersSymbol();
        const seriesWeek = await this.getTrackedDataForSavedTickersWeek();
        const sma = [];
        for (const symbol of tracked) {
            const smaData = await this.stockApiClient.getTickerSMA(symbol as string);
            sma.push(smaData);
        }
        const rsi = [];
        for (const symbol of tracked) {
            const rsiData = await this.stockApiClient.getTickerRSI(symbol as string);
            rsi.push(rsiData);
        }
        const response: StockHistory[] = [];
        for (let i = 0; i < seriesWeek.length; i++){
            let tickerWeek = seriesWeek[i];
            if (!tickerWeek || !tickerWeek.timeSeries || tickerWeek.timeSeries.length < 2) {
              continue; 
            }
            let currentWeek = tickerWeek.timeSeries[0] as { close: number; high: number; low: number; volume: number };
            let previousWeek = tickerWeek.timeSeries[1] as { close: number; high: number; low: number; volume: number };
            let percentageChange : number = ((currentWeek.close-previousWeek.close)/previousWeek.close) * 100;              // Calculo del porcentaje de cambio entre la semana actual y la semana anterior
            let volatility : number = ((currentWeek.high - currentWeek.low) / currentWeek.low) * 100;                       // Calculo de la volatilidad de la semana actual
            let averageVolumeRaw = tickerWeek.timeSeries.slice(1,21);
            let sumAverageVolume = averageVolumeRaw.reduce((acc, unit) => acc + unit.volume, 0);
            let averageVolume : number = averageVolumeRaw.length > 0 ? sumAverageVolume / averageVolumeRaw.length : 1;  
            let volumeVsAverage : number = currentWeek.volume / averageVolume;                                              // Calculo del volumen de la semana actual comparado con el promedio de las últimas 20 semanas
            let currentSymbol = tickerWeek.symbol;
            let technicalSma = sma.find(s => s.symbol === currentSymbol);
            let technicalRsi = rsi.find(r => r.symbol === currentSymbol);
            let smaValue = technicalSma && technicalSma.data[0] ? technicalSma.data[0].SMA : currentWeek?.close;            // Definicion del valor SMA (Simple Moving Average) de la semana actual, si no se encuentra disponible se asigna el precio de cierre actual
            let rsiValue = technicalRsi && technicalRsi.data[0] ? technicalRsi.data[0].RSI : 50;                            // Definicion del valor RSI (Relative Strength Index) de la semana actual, si no se encuentra disponible se asigna un valor neutro de 50
            let isBullish = currentWeek && smaValue ? currentWeek.close > smaValue : false;                                 // Determina si el activo bursátil está en alta o baja basado en la comparación del precio de cierre actual con el valor de SMA calculado
            let volatilityStatus : "overbought" | "oversold" | "normal" = volatility > 5 ? "overbought" : volatility < 1.5 ? "oversold" : "normal"; // Define el estado de volatilidad basado en el porcentaje de volatilidad calculado

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
    };


    // Inicia el seguimiento de un ticker específico, agregándolo a la base de datos si cumple con los criterios de búsqueda y no está ya registrado. Retorna un resumen del proceso
    async startTrackingTicker(symbol: string): Promise<TrackingSummaryResponse> {
        const matches = await this.stockApiClient.getSymbolSearch(symbol);
        const trackedTickers: Array<{ symbol: string; name: string }> = [];
        let ignoredCount = 0;
        let duplicatesCount = 0;

        if (matches && matches.length > 0){
            for (const unit of matches) {
                if (parseFloat(unit.score as any) > 0.6) {
                    const newTicker: IStockTickerInput = {
                        name: unit.name,
                        symbol: unit.symbol,
                        type: unit.type,
                        region: unit.region,
                        currency: unit.currency,
                    };
                    try {
                        await this.stockRepository.createTickerTracker(newTicker);
                        trackedTickers.push({ symbol: unit.symbol, name: unit.name });
                    } catch (dbError: any) {
                        if (dbError.code === 11000) {
                          duplicatesCount++;
                        } else {
                          throw dbError;
                        }
                    }
                } else {
                    ignoredCount++;
                }
            }
        }

        if (trackedTickers.length === 0) {
            if (duplicatesCount > 0) {
                throw new Error(`Ya se encuentra siguiendo el activo ${symbol}.`);
            }
            throw new Error(`No se han encontrado activos bursátiles con el simbolo ${symbol}.`);
        }

        return {
            searchKeyword: symbol,
            totalMatchesFound: matches.length,
            trackedCount: trackedTickers.length,
            trackedTickers: trackedTickers,
            ignoredCount: ignoredCount
        };
    }

    // Elimina un ticker específico de la base de datos, ya sea por su id o por su símbolo. Retorna el ticker eliminado o null si no se encontró. Se aceptan como parametros el id del ticker en la base de datos o el símbolo del ticker. Si se proporciona el símbolo, se prioriza la eliminación por símbolo.
    async removeTickerFromTracking(id: string, symbol?: string) : Promise<IStockTicker | null> {
        return await this.stockRepository.removeTickerTracker(id, symbol);
    }
}