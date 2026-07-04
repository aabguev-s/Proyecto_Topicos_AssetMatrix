//models/Crypto.ts

import { Schema, model, Document } from 'mongoose';

// Esquema no definitivo. Se ajustará al integrar las API externas.

export interface ICryptoTransaction {
  _id?: any;
  type: 'buy' | 'sell';
  amount: number;
  priceAtTx: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICrypto extends Document {
  name: string;
  symbol: string;
  price: number;
  marketCap?: number;
  transactions: ICryptoTransaction[];
  createdAt: Date;
  updatedAt: Date;
}

const CryptoTransactionSchema = new Schema<ICryptoTransaction>(
  {
    type: { type: String, enum: ['buy', 'sell'], required: true },
    amount: { type: Number, required: true },
    priceAtTx: { type: Number, required: true },
  },
  { timestamps: true }
);

const CryptoSchema = new Schema<ICrypto>(
  {
    name: { type: String, required: true, unique: true },
    symbol: { type: String, required: true, uppercase: true },
    price: { type: Number, required: true },
    marketCap: { type: Number },
    transactions: [CryptoTransactionSchema],
  },
  { timestamps: true }
);

export const Crypto = model<ICrypto>('Crypto', CryptoSchema);