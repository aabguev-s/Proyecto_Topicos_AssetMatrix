import { Schema, model, Document } from 'mongoose';

export interface IStockWatch extends Document {
  symbol: string;
  companyName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StockWatchSchema = new Schema<IStockWatch>(
  {
    symbol: { type: String, required: true, unique: true, uppercase: true },
    companyName: { type: String },
  },
  { timestamps: true }
);

export const StockWatch = model<IStockWatch>('StockWatch', StockWatchSchema);
