import { StockTicker, IStockTicker, IStockTickerInput } from "../models/StockTicker";

export class StockTickerRepository {

    async createTickerTracker(data: IStockTickerInput): Promise<IStockTicker> {
        return await StockTicker.create(data);
    }

    async removeTickerTracker(id: string, symbol?: string): Promise<IStockTicker | null>{
        let result: IStockTicker | null;
        if (symbol) {
            result = await StockTicker.findOneAndDelete({symbol: symbol}).exec();
        } else{
            result = await StockTicker.findByIdAndDelete(id).exec();

        };
        return result;
    }

    async getAllCurrentTickersSymbol(): Promise<String[]>{
        const raw : IStockTicker[] = await StockTicker.find().exec();
        return raw.map((ticker: IStockTicker) => ticker.symbol);
    };

    async getAllCurrentTickers(): Promise<IStockTicker[]>{
        return await StockTicker.find().exec();
    };

}