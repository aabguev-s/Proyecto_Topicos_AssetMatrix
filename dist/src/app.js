"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cryptoRoutes_1 = __importDefault(require("./routes/cryptoRoutes"));
const createApp = (options = {}) => {
    const { includeSwagger = true } = options;
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    if (includeSwagger) {
        const { specs } = require('./config/swagger');
        app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    app.use('/api/crypto', cryptoRoutes_1.default);
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Something went wrong internally.' });
    });
    return app;
};
exports.createApp = createApp;
exports.app = (0, exports.createApp)();
//# sourceMappingURL=app.js.map