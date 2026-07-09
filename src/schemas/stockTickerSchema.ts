import { z } from 'zod';

// Metricas de Alpha Vantage Formato
const metricsSchema = z.object({
  '1. open': z.string().transform((val) => parseFloat(val)),
  '2. high': z.string().transform((val) => parseFloat(val)),
  '3. low': z.string().transform((val) => parseFloat(val)),
  '4. close': z.string().transform((val) => parseFloat(val)),
  '5. volume': z.string().transform((val) => parseInt(val, 10)),
});

const metaDataSchemaAlphaVantage = z.object({
  "1: Symbol": z.string().uppercase(),
  "2: Indicator": z.string(),
  "3: Last Refreshed": z.string(),
  "4: Interval": z.string(),
  "5: Time Period": z.coerce.number(),
  "6: Series Type": z.string(),
  "7: Time Zone": z.string(),
});

// Respuesta Time Series Alpha Vantage
export const alphaVantageSeriesDSchema = z.object({
  'Meta Data': z.object({
    '1. Information': z.string(),
    '2. Symbol': z.string().toUpperCase(),
    '3. Last Refreshed': z.string(),
    '4. Output Size': z.string(),
    '5. Time Zone': z.string(),
  }),
  
  'Time Series (Daily)': z.record(
    z.string(),  
    metricsSchema 
  ),
});

export const alphaVantageSeriesWSchema = z.object({
  'Meta Data': z.object({
    '1. Information': z.string(),
    '2. Symbol': z.string().toUpperCase(),
    '3. Last Refreshed': z.string(),
    '4. Time Zone': z.string(),
  }),
  
  'Weekly Time Series': z.record(
    z.string(),  
    metricsSchema 
  ),
});

export const alphaVantageSeriesMSchema = z.object({
  'Meta Data': z.object({
    '1. Information': z.string(),
    '2. Symbol': z.string().toUpperCase(),
    '3. Last Refreshed': z.string(),
    '4. Time Zone': z.string(),
  }),
  
  'Monthly Time Series': z.record(
    z.string(),  
    metricsSchema 
  ),
});


export const technicalIndicatorsAlphaVantageRSI = z.object({
  "Meta Data" : metaDataSchemaAlphaVantage,
  "Technical Analysis: RSI" : z.record(
      z.string(),
      z.object({"RSI": z.string().transform((val) => parseFloat(val))})
  )
});

export const technicalIndicatorsAlphaVantageSMA = z.object({
  "Meta Data" : metaDataSchemaAlphaVantage,
  "Technical Analysis: SMA" : z.record(
      z.string(),
      z.object({"SMA": z.string().transform((val) => parseFloat(val))})
  )
});

// Respuesta Symbol Search
const tickerSymbolSearchSchema = z.object({
  '1. symbol': z.string().trim().toUpperCase(),
  '2. name': z.string().trim(),
  '3. type': z.string().trim(),
  '4. region': z.string().trim(),
  '5. marketOpen': z.string(),
  '6. marketClose': z.string(),
  '7. timezone': z.string(),
  '8. currency': z.string().trim().toUpperCase(),
  '9. matchScore': z.string().transform((val) => parseFloat(val)), // Parse text score to a float number
});

export const alphaVantageSymbolSearchSchema = z.object({
  bestMatches: z.array(tickerSymbolSearchSchema).catch([]),
}).catchall(z.any());

// Respuesta MarketStatus 
const marketStatusSchema = z.object({
  market_type: z.string().trim(),
  region: z.string().trim(),
  primary_exchanges: z.string().trim(),
  local_open: z.string(),
  local_close: z.string(),
  current_status: z.enum(['open', 'closed']), 
  notes: z.string().catch(''),
});

export const alphaVantageMarketStatusSchema = z.object({
  endpoint: z.string(),
  markets: z.array(marketStatusSchema),
});

// Respuesta GlobalQuote
const globalQuoteMetricsSchema = z.object({
  '01. symbol': z.string().trim().toUpperCase(),
  '02. open': z.string().transform((val) => parseFloat(val)),
  '03. high': z.string().transform((val) => parseFloat(val)),
  '04. low': z.string().transform((val) => parseFloat(val)),
  '05. price': z.string().transform((val) => parseFloat(val)),
  '06. volume': z.string().transform((val) => parseInt(val, 10)),
  '07. latest trading day': z.string(),
  '08. previous close': z.string().transform((val) => parseFloat(val)),
  '09. change': z.string().transform((val) => parseFloat(val)),
  '10. change percent': z.string().transform((val) => parseFloat(val.replace('%', ''))),
});

export const alphaVantageQuoteSchema = z.object({
  'Global Quote': globalQuoteMetricsSchema,
});

export const trackingSummaryResponseSchema = z.object({
  searchKeyword: z.string(),
  totalMatchesFound: z.number().int().nonnegative(),
  trackedCount: z.number().int().nonnegative(),
  trackedTickers: z.array(
    z.object({
      symbol: z.string(),
      name: z.string()
    })
  ),
  ignoredCount: z.number().int().nonnegative(),
});

// Validación de Parámetros HTTP
const stockTickerParamsSchema = z.object({
  symbol: z.string().min(1).trim().toUpperCase(),
});

