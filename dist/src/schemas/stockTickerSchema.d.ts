import { z } from 'zod';
export declare const alphaVantageSeriesDSchema: z.ZodObject<{
    'Meta Data': z.ZodObject<{
        '1. Information': z.ZodString;
        '2. Symbol': z.ZodString;
        '3. Last Refreshed': z.ZodString;
        '4. Output Size': z.ZodString;
        '5. Time Zone': z.ZodString;
    }, z.core.$strip>;
    'Time Series (Daily)': z.ZodRecord<z.ZodString, z.ZodObject<{
        '1. open': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '2. high': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '3. low': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '4. close': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '5. volume': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const alphaVantageSeriesWSchema: z.ZodObject<{
    'Meta Data': z.ZodObject<{
        '1. Information': z.ZodString;
        '2. Symbol': z.ZodString;
        '3. Last Refreshed': z.ZodString;
        '4. Time Zone': z.ZodString;
    }, z.core.$strip>;
    'Weekly Time Series': z.ZodRecord<z.ZodString, z.ZodObject<{
        '1. open': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '2. high': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '3. low': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '4. close': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '5. volume': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const alphaVantageSeriesMSchema: z.ZodObject<{
    'Meta Data': z.ZodObject<{
        '1. Information': z.ZodString;
        '2. Symbol': z.ZodString;
        '3. Last Refreshed': z.ZodString;
        '4. Time Zone': z.ZodString;
    }, z.core.$strip>;
    'Monthly Time Series': z.ZodRecord<z.ZodString, z.ZodObject<{
        '1. open': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '2. high': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '3. low': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '4. close': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '5. volume': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const technicalIndicatorsAlphaVantageRSI: z.ZodObject<{
    "Meta Data": z.ZodObject<{
        "1: Symbol": z.ZodString;
        "2: Indicator": z.ZodString;
        "3: Last Refreshed": z.ZodString;
        "4: Interval": z.ZodString;
        "5: Time Period": z.ZodCoercedNumber<unknown>;
        "6: Series Type": z.ZodString;
        "7: Time Zone": z.ZodString;
    }, z.core.$strip>;
    "Technical Analysis: RSI": z.ZodRecord<z.ZodString, z.ZodObject<{
        RSI: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const technicalIndicatorsAlphaVantageSMA: z.ZodObject<{
    "Meta Data": z.ZodObject<{
        "1: Symbol": z.ZodString;
        "2: Indicator": z.ZodString;
        "3: Last Refreshed": z.ZodString;
        "4: Interval": z.ZodString;
        "5: Time Period": z.ZodCoercedNumber<unknown>;
        "6: Series Type": z.ZodString;
        "7: Time Zone": z.ZodString;
    }, z.core.$strip>;
    "Technical Analysis: SMA": z.ZodRecord<z.ZodString, z.ZodObject<{
        SMA: z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const alphaVantageSymbolSearchSchema: z.ZodObject<{
    bestMatches: z.ZodCatch<z.ZodArray<z.ZodObject<{
        '1. symbol': z.ZodString;
        '2. name': z.ZodString;
        '3. type': z.ZodString;
        '4. region': z.ZodString;
        '5. marketOpen': z.ZodString;
        '6. marketClose': z.ZodString;
        '7. timezone': z.ZodString;
        '8. currency': z.ZodString;
        '9. matchScore': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    }, z.core.$strip>>>;
}, z.core.$catchall<z.ZodAny>>;
export declare const alphaVantageMarketStatusSchema: z.ZodObject<{
    endpoint: z.ZodString;
    markets: z.ZodArray<z.ZodObject<{
        market_type: z.ZodString;
        region: z.ZodString;
        primary_exchanges: z.ZodString;
        local_open: z.ZodString;
        local_close: z.ZodString;
        current_status: z.ZodEnum<{
            open: "open";
            closed: "closed";
        }>;
        notes: z.ZodCatch<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const alphaVantageQuoteSchema: z.ZodObject<{
    'Global Quote': z.ZodObject<{
        '01. symbol': z.ZodString;
        '02. open': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '03. high': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '04. low': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '05. price': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '06. volume': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '07. latest trading day': z.ZodString;
        '08. previous close': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '09. change': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
        '10. change percent': z.ZodPipe<z.ZodString, z.ZodTransform<number, string>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const trackingSummaryResponseSchema: z.ZodObject<{
    searchKeyword: z.ZodString;
    totalMatchesFound: z.ZodNumber;
    trackedCount: z.ZodNumber;
    trackedTickers: z.ZodArray<z.ZodObject<{
        symbol: z.ZodString;
        name: z.ZodString;
    }, z.core.$strip>>;
    ignoredCount: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=stockTickerSchema.d.ts.map