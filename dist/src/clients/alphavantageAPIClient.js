"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockApiClient = void 0;
const baseAPIClient_1 = require("./baseAPIClient");
const stockTickerSchema_1 = require("../schemas/stockTickerSchema");
class StockApiClient extends baseAPIClient_1.BaseApiClient {
    constructor() {
        super({
            baseUrl: 'https://www.alphavantage.co/query',
            apiKey: process.env.ALPHAVANTAGE_API_KEY || 'demo',
        });
    }
    validateResponse(raw) {
        if (raw && (raw.Information || raw.Note || raw["Error Message"])) {
            console.error("Alpha Vantage API Warning/Error Context:", raw);
            const providerMessage = raw.Information || raw.Note || raw["Error Message"];
            throw new Error(`Alpha Vantage API ha fallado: ${providerMessage}`);
        }
    }
    // MÉTODOS PARA OBTENER SERIES DE TIEMPO DIARIAS, SEMANALES Y MENSUALES DE ACCIONES EN EL MERCADO GLOBAL
    async getGlobalEquityDaily(symbol) {
        const raw = await this.request('?function=TIME_SERIES_DAILY&symbol=' + symbol + '&apikey=' + this.apiKey);
        this.validateResponse(raw);
        const parsed = stockTickerSchema_1.alphaVantageSeriesDSchema.parse(raw);
        const metadata = parsed["Meta Data"] || {};
        const stockSymbol = metadata["2. Symbol"] || symbol;
        const lastRefreshed = metadata["3. Last Refreshed"] || "";
        const rawSeries = parsed["Time Series (Daily)"] || {};
        const timeSeries = Object.entries(rawSeries).map(([date, values]) => ({
            date,
            open: values["1. open"],
            high: values["2. high"],
            low: values["3. low"],
            close: values["4. close"],
            volume: values["5. volume"],
        }));
        return {
            symbol: stockSymbol,
            lastUpdated: lastRefreshed,
            timeSeries: timeSeries
        };
    }
    async getGlobalEquityWeekly(symbol) {
        const raw = await this.request('?function=TIME_SERIES_WEEKLY&symbol=' + symbol + '&apikey=' + this.apiKey);
        this.validateResponse(raw);
        const parsed = stockTickerSchema_1.alphaVantageSeriesWSchema.parse(raw);
        const metadata = parsed["Meta Data"] || {};
        const stockSymbol = metadata["2. Symbol"] || symbol;
        const lastRefreshed = metadata["3. Last Refreshed"] || "";
        const rawSeries = parsed["Weekly Time Series"] || {};
        const timeSeries = Object.entries(rawSeries).map(([date, values]) => ({
            date,
            open: values["1. open"],
            high: values["2. high"],
            low: values["3. low"],
            close: values["4. close"],
            volume: values["5. volume"],
        }));
        return {
            symbol: stockSymbol,
            lastUpdated: lastRefreshed,
            timeSeries: timeSeries
        };
    }
    async getGlobalEquityMonthly(symbol) {
        const raw = await this.request('?function=TIME_SERIES_MONTHLY&symbol=' + symbol + '&apikey=' + this.apiKey);
        this.validateResponse(raw);
        const parsed = stockTickerSchema_1.alphaVantageSeriesMSchema.parse(raw);
        const metadata = parsed["Meta Data"] || {};
        const stockSymbol = metadata["2. Symbol"] || symbol;
        const lastRefreshed = metadata["3. Last Refreshed"] || "";
        const rawSeries = parsed["Monthly Time Series"] || {};
        const timeSeries = Object.entries(rawSeries).map(([date, values]) => ({
            date,
            open: values["1. open"],
            high: values["2. high"],
            low: values["3. low"],
            close: values["4. close"],
            volume: values["5. volume"],
        }));
        return {
            symbol: stockSymbol,
            lastUpdated: lastRefreshed,
            timeSeries: timeSeries
        };
    }
    // MÉTODO PARA OBTENER EL PRECIO MÁS RECIENTE DE UNA ACCIÓN EN EL MERCADO GLOBAAL
    async getLatestPrice(symbol) {
        const raw = await this.request('?function=GLOBAL_QUOTE&symbol=' + symbol + '&apikey=' + this.apiKey);
        this.validateResponse(raw);
        const parsed = stockTickerSchema_1.alphaVantageQuoteSchema.parse(raw);
        const quote = parsed['Global Quote'];
        return {
            symbol: quote['01. symbol'],
            open: quote['02. open'],
            high: quote['03. high'],
            low: quote['04. low'],
            price: quote['05. price'],
            volume: quote['06. volume'],
            latestTradingDay: quote['07. latest trading day'],
            previousClose: quote['08. previous close'],
            change: quote['09. change'],
            changePercent: quote['10. change percent']
        };
    }
    // MÉTODO PARA OBTENER EL ESTATUS DE LOS MERCADOS GLOBALES
    async getGlobalMarketStatus() {
        const raw = await this.request('?function=MARKET_STATUS&apikey=' + this.apiKey);
        this.validateResponse(raw);
        const parsed = stockTickerSchema_1.alphaVantageMarketStatusSchema.parse(raw);
        const markets = parsed['markets'] || [];
        return markets.map((market) => ({
            marketType: market.market_type,
            region: market.region,
            marketOpen: market.local_open,
            marketClose: market.local_close,
            currentStatus: market.current_status === 'open' ? true : false
        }));
    }
    // MÉRODO QUE BUSCA DENTRO DEL LISTADO DE ACCIONES AQEULLOS QUE HAGAN 'MATCH' CON LA KEYWORD PASADA 
    async getSymbolSearch(keyword) {
        const raw = await this.request('?function=SYMBOL_SEARCH&keywords=' + keyword + '&apikey=' + this.apiKey);
        this.validateResponse(raw);
        const parsed = stockTickerSchema_1.alphaVantageSymbolSearchSchema.parse(raw);
        const bestMatches = parsed.bestMatches || [];
        return bestMatches.map((match) => ({
            symbol: match['1. symbol'],
            name: match['2. name'],
            type: match['3. type'],
            region: match['4. region'],
            currency: match['8. currency'],
            score: match['9. matchScore']
        }));
    }
    async getTickerSMA(symbol) {
        const raw = await this.request('?function=SMA&symbol=' + symbol + '&interval=weekly&time_period=10&series_type=open&apikey=' + this.apiKey);
        this.validateResponse(raw);
        const parsed = stockTickerSchema_1.technicalIndicatorsAlphaVantageSMA.parse(raw);
        const dataSMA = Object.entries(parsed["Technical Analysis: SMA"]).map(([date, values]) => {
            return {
                date: date,
                SMA: values.SMA
            };
        });
        return {
            symbol: symbol,
            data: dataSMA,
        };
    }
    async getTickerRSI(symbol) {
        const raw = await this.request('?function=RSI&symbol=' + symbol + '&interval=weekly&time_period=10&series_type=open&apikey=' + this.apiKey);
        this.validateResponse(raw);
        const parsed = stockTickerSchema_1.technicalIndicatorsAlphaVantageRSI.parse(raw);
        const dataSMA = Object.entries(parsed["Technical Analysis: RSI"]).map(([date, values]) => {
            return {
                date: date,
                RSI: values.RSI
            };
        });
        return {
            symbol: symbol,
            data: dataSMA,
        };
    }
}
exports.StockApiClient = StockApiClient;
//# sourceMappingURL=alphavantageAPIClient.js.map