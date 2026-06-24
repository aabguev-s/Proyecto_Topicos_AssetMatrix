"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTestDB = exports.disconnectTestDB = exports.connectTestDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoServer = null;
let isConnected = false;
const connectTestDB = async () => {
    if (isConnected) {
        return;
    }
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    await mongoose_1.default.connect(mongoServer.getUri());
    isConnected = true;
};
exports.connectTestDB = connectTestDB;
const disconnectTestDB = async () => {
    if (mongoose_1.default.connection.readyState !== 0) {
        await mongoose_1.default.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
        mongoServer = null;
    }
    isConnected = false;
};
exports.disconnectTestDB = disconnectTestDB;
const clearTestDB = async () => {
    const collections = mongoose_1.default.connection.collections;
    for (const collection of Object.values(collections)) {
        await collection.deleteMany({});
    }
};
exports.clearTestDB = clearTestDB;
//# sourceMappingURL=db.js.map