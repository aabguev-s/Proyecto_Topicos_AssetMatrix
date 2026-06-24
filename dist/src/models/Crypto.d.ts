import { Document } from 'mongoose';
export interface ICrypto extends Document {
    name: string;
    symbol: string;
    price: number;
    marketCap?: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Crypto: import("mongoose").Model<ICrypto, {}, {}, {}, Document<unknown, {}, ICrypto, {}, import("mongoose").DefaultSchemaOptions> & ICrypto & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, ICrypto>;
//# sourceMappingURL=Crypto.d.ts.map