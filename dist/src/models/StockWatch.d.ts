import { Document } from 'mongoose';
export interface IStockWatch extends Document {
    symbol: string;
    companyName?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const StockWatch: import("mongoose").Model<IStockWatch, {}, {}, {}, Document<unknown, {}, IStockWatch, {}, import("mongoose").DefaultSchemaOptions> & IStockWatch & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IStockWatch>;
//# sourceMappingURL=StockWatch.d.ts.map