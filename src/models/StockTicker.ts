import { Schema, model, Document } from 'mongoose';

export interface IStockTicker extends Document {
    name: string;
    symbol: string;
    type: string;
    region: string;
    currency: string;
    createdAt: Date;
    updatedAt: Date;
};

export type IStockTickerInput = Omit<IStockTicker, keyof Document | 'createdAt' | 'updatedAt'>;

const StockTickerSchema = new Schema<IStockTicker>(
    {
        name: {type: String, required: true, uppercase: true},
        symbol: {type: String, required: true, uppercase: true, unique: true},
        type: {type: String, required: true},
        region: {type: String, required: true},
        currency: {type: String, required: true, uppercase: true}
    },
    { timestamps: true }
);

export const StockTicker = model<IStockTicker>('StockTicker', StockTickerSchema);