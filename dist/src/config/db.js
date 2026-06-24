"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crypto_db';
const RETRY_INTERVAL = 5000; // 5 seconds
const connectDB = async () => {
    if (!MONGO_URI) {
        console.error('Error: MONGO_URI no está definida en las variables de entorno.');
        process.exit(1);
    }
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('MongoDB successfully connected.');
    }
    catch (err) {
        console.error('MongoDB connection failed. Retrying in 5 seconds...', err);
        setTimeout(exports.connectDB, RETRY_INTERVAL);
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=db.js.map