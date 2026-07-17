import { ICrypto, ICryptoTransaction } from '../models/Crypto';
import { CoinMarketsResponse } from '../models/CryptoDataManagement';
export declare class CryptoService {
    private cryptoRepository;
    private CryptoApiClient;
    createCrypto(cryptoId: string, transaction?: Partial<ICryptoTransaction>): Promise<ICrypto>;
    getAllCryptos(): Promise<ICrypto[]>;
    getCryptoById(id: string): Promise<ICrypto>;
    updateCrypto(id: string, data: Partial<ICrypto>): Promise<ICrypto>;
    deleteCrypto(id: string): Promise<void>;
    getPortfolioAnalytics(): Promise<{
        totalTransactionsProcessed: number;
        portfolioHistoricalBalance: {
            totalInitialValue: number;
            totalCurrentValue: number;
            netHistoricalProfitOrLoss: number;
            globalGrowthPercentage: number;
        };
        marketSummary: {
            [key: string]: {
                initialPrice: number;
                lastPrice: number;
                lastVolume: number;
                assetGrowthPercentage: number;
            };
        };
    }>;
    getCoinQuote(coinId: string): Promise<CoinMarketsResponse | undefined>;
}
//# sourceMappingURL=cryptoService.d.ts.map