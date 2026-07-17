"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackingSummaryResponseSchema = exports.alphaVantageQuoteSchema = exports.alphaVantageMarketStatusSchema = exports.alphaVantageSymbolSearchSchema = exports.technicalIndicatorsAlphaVantageSMA = exports.technicalIndicatorsAlphaVantageRSI = exports.alphaVantageSeriesMSchema = exports.alphaVantageSeriesWSchema = exports.alphaVantageSeriesDSchema = void 0;
const zod_1 = require("zod");
// Metricas de Alpha Vantage Formato
const metricsSchema = zod_1.z.object({
    '1. open': zod_1.z.string().transform((val) => parseFloat(val)),
    '2. high': zod_1.z.string().transform((val) => parseFloat(val)),
    '3. low': zod_1.z.string().transform((val) => parseFloat(val)),
    '4. close': zod_1.z.string().transform((val) => parseFloat(val)),
    '5. volume': zod_1.z.string().transform((val) => parseInt(val, 10)),
});
const metaDataSchemaAlphaVantage = zod_1.z.object({
    "1: Symbol": zod_1.z.string().uppercase(),
    "2: Indicator": zod_1.z.string(),
    "3: Last Refreshed": zod_1.z.string(),
    "4: Interval": zod_1.z.string(),
    "5: Time Period": zod_1.z.coerce.number(),
    "6: Series Type": zod_1.z.string(),
    "7: Time Zone": zod_1.z.string(),
});
// Respuesta Time Series Alpha Vantage
exports.alphaVantageSeriesDSchema = zod_1.z.object({
    'Meta Data': zod_1.z.object({
        '1. Information': zod_1.z.string(),
        '2. Symbol': zod_1.z.string().toUpperCase(),
        '3. Last Refreshed': zod_1.z.string(),
        '4. Output Size': zod_1.z.string(),
        '5. Time Zone': zod_1.z.string(),
    }),
    'Time Series (Daily)': zod_1.z.record(zod_1.z.string(), metricsSchema),
});
exports.alphaVantageSeriesWSchema = zod_1.z.object({
    'Meta Data': zod_1.z.object({
        '1. Information': zod_1.z.string(),
        '2. Symbol': zod_1.z.string().toUpperCase(),
        '3. Last Refreshed': zod_1.z.string(),
        '4. Time Zone': zod_1.z.string(),
    }),
    'Weekly Time Series': zod_1.z.record(zod_1.z.string(), metricsSchema),
});
exports.alphaVantageSeriesMSchema = zod_1.z.object({
    'Meta Data': zod_1.z.object({
        '1. Information': zod_1.z.string(),
        '2. Symbol': zod_1.z.string().toUpperCase(),
        '3. Last Refreshed': zod_1.z.string(),
        '4. Time Zone': zod_1.z.string(),
    }),
    'Monthly Time Series': zod_1.z.record(zod_1.z.string(), metricsSchema),
});
exports.technicalIndicatorsAlphaVantageRSI = zod_1.z.object({
    "Meta Data": metaDataSchemaAlphaVantage,
    "Technical Analysis: RSI": zod_1.z.record(zod_1.z.string(), zod_1.z.object({ "RSI": zod_1.z.string().transform((val) => parseFloat(val)) }))
});
exports.technicalIndicatorsAlphaVantageSMA = zod_1.z.object({
    "Meta Data": metaDataSchemaAlphaVantage,
    "Technical Analysis: SMA": zod_1.z.record(zod_1.z.string(), zod_1.z.object({ "SMA": zod_1.z.string().transform((val) => parseFloat(val)) }))
});
// Respuesta Symbol Search
const tickerSymbolSearchSchema = zod_1.z.object({
    '1. symbol': zod_1.z.string().trim().toUpperCase(),
    '2. name': zod_1.z.string().trim(),
    '3. type': zod_1.z.string().trim(),
    '4. region': zod_1.z.string().trim(),
    '5. marketOpen': zod_1.z.string(),
    '6. marketClose': zod_1.z.string(),
    '7. timezone': zod_1.z.string(),
    '8. currency': zod_1.z.string().trim().toUpperCase(),
    '9. matchScore': zod_1.z.string().transform((val) => parseFloat(val)), // Parse text score to a float number
});
exports.alphaVantageSymbolSearchSchema = zod_1.z.object({
    bestMatches: zod_1.z.array(tickerSymbolSearchSchema).catch([]),
}).catchall(zod_1.z.any());
// Respuesta MarketStatus 
const marketStatusSchema = zod_1.z.object({
    market_type: zod_1.z.string().trim(),
    region: zod_1.z.string().trim(),
    primary_exchanges: zod_1.z.string().trim(),
    local_open: zod_1.z.string(),
    local_close: zod_1.z.string(),
    current_status: zod_1.z.enum(['open', 'closed']),
    notes: zod_1.z.string().catch(''),
});
exports.alphaVantageMarketStatusSchema = zod_1.z.object({
    endpoint: zod_1.z.string(),
    markets: zod_1.z.array(marketStatusSchema),
});
// Respuesta GlobalQuote
const globalQuoteMetricsSchema = zod_1.z.object({
    '01. symbol': zod_1.z.string().trim().toUpperCase(),
    '02. open': zod_1.z.string().transform((val) => parseFloat(val)),
    '03. high': zod_1.z.string().transform((val) => parseFloat(val)),
    '04. low': zod_1.z.string().transform((val) => parseFloat(val)),
    '05. price': zod_1.z.string().transform((val) => parseFloat(val)),
    '06. volume': zod_1.z.string().transform((val) => parseInt(val, 10)),
    '07. latest trading day': zod_1.z.string(),
    '08. previous close': zod_1.z.string().transform((val) => parseFloat(val)),
    '09. change': zod_1.z.string().transform((val) => parseFloat(val)),
    '10. change percent': zod_1.z.string().transform((val) => parseFloat(val.replace('%', ''))),
});
exports.alphaVantageQuoteSchema = zod_1.z.object({
    'Global Quote': globalQuoteMetricsSchema,
});
exports.trackingSummaryResponseSchema = zod_1.z.object({
    searchKeyword: zod_1.z.string(),
    totalMatchesFound: zod_1.z.number().int().nonnegative(),
    trackedCount: zod_1.z.number().int().nonnegative(),
    trackedTickers: zod_1.z.array(zod_1.z.object({
        symbol: zod_1.z.string(),
        name: zod_1.z.string()
    })),
    ignoredCount: zod_1.z.number().int().nonnegative(),
});
// Validación de Parámetros HTTP
const stockTickerParamsSchema = zod_1.z.object({
    symbol: zod_1.z.string().min(1).trim().toUpperCase(),
});
//# sourceMappingURL=stockTickerSchema.js.map