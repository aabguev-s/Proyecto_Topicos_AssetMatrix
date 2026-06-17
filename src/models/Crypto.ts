import { Schema, model, Document } from 'mongoose';

// Esquema no definitivo. Se ajustará al integrar las API externas.

export interface ICrypto extends Document {
  name: string;
  symbol: string;
  price: number;
  marketCap?: number;
  createdAt: Date;
  updatedAt: Date;
}

const CryptoSchema = new Schema<ICrypto>(
  {
    name: { type: String, required: true, unique: true },
    symbol: { type: String, required: true, uppercase: true },
    price: { type: Number, required: true },
    marketCap: { type: Number },
  },
  { timestamps: true }
);

export const Crypto = model<ICrypto>('Crypto', CryptoSchema);