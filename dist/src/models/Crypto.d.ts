import { Document } from 'mongoose';
export interface ICryptoTransaction {
    _id?: any;
    current_price: number;
    total_volume: number;
    data_from: string | Date;
    createdAt: string | Date;
}
export interface ICrypto extends Document {
    id: string;
    name: string;
    symbol: string;
    transactions: ICryptoTransaction[];
}
export declare const Crypto: import("mongoose").Model<ICrypto, {}, {}, {}, Document<unknown, {}, ICrypto, {}, import("mongoose").DefaultSchemaOptions> & ICrypto & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any, ICrypto>;
//# sourceMappingURL=Crypto.d.ts.map