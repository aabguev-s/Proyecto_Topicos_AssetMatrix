//models/Crypto.ts

import { Schema, model, Document } from 'mongoose';

// Esquema no definitivo. Se ajustará al integrar las API externas.

export interface ICryptoTransaction {
  _id?: any;
  current_price: number;
  total_volume: number;
  data_from: string | Date;
  createdAt: string | Date;
}

export interface ICrypto extends Document {
  id: string; // Tu ID manual (ej: "bitcoin")
  name: string;
  symbol: string;
  transactions: ICryptoTransaction[];
}

const CryptoTransactionSchema = new Schema<ICryptoTransaction>(
  {
    current_price: { type: Number, required: true },
    total_volume: { type: Number, required: true },
    data_from: { type: String, required: false }, // Almacena la fecha como string ISO
    createdAt: { type: String, required: true } // Almacena la fecha como string ISO
  },
  { _id: true } // Nos aseguramos de que la BD le cree su ID automático a cada transacción
);

const CryptoSchema = new Schema<ICrypto>(
 {
    id: { type: String, required: true, unique: true }, // Campo para tu ID manual
    name: { type: String, required: true, unique: true },
    symbol: { type: String, required: true, uppercase: true },
    transactions: [CryptoTransactionSchema],
  },
);

export const Crypto = model<ICrypto>('Crypto', CryptoSchema);