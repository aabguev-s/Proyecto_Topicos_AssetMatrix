import { Document } from 'mongoose';
export interface IStockTicker extends Document {
    name: string;
    symbol: string;
    type: string;
    region: string;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
}
export type IStockTickerInput = Omit<IStockTicker, keyof Document | 'createdAt' | 'updatedAt'>;
export declare const StockTicker: import("mongoose").Model<IStockTicker, {}, {}, {}, Document<unknown, {}, IStockTicker, {}, import("mongoose").DefaultSchemaOptions> & IStockTicker & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IStockTicker>;
//# sourceMappingURL=StockTicker.d.ts.map