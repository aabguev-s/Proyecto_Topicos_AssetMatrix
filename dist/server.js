"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const app_1 = require("./src/app");
const db_1 = require("./src/config/db");
const swagger_1 = require("./src/config/swagger");
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cryptoRoutes_1 = __importDefault(require("./src/routes/cryptoRoutes"));
const stockRoutes_1 = __importDefault(require("./src/routes/stockRoutes"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app_1.app.use((0, cors_1.default)());
app_1.app.use(express_1.default.json());
// Rutas de la Interfaz Gráfica de Swagger
app_1.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.specs));
// Rutas de la API
app_1.app.use('/api/cryptos', cryptoRoutes_1.default);
app_1.app.use('/api/stock', stockRoutes_1.default);
// Manejador de Errores Global
app_1.app.use((err, req, res, next) => {
    console.error(err.stack);
    // If the error originates from an external API client (AlphaVantage / CoinGecko),
    // prefer returning the original message so the user sees token-limit or provider hints.
    const msg = err && err.message ? String(err.message) : null;
    if (msg && (msg.includes('Alpha Vantage') || msg.includes('CoinGecko') || msg.includes('API ha fallado') || msg.includes('Respuesta inválida') || msg.includes('Error de la API externa'))) {
        return res.status(500).json({ error: msg });
    }
    res.status(500).json({ error: 'Something went wrong internally.' });
});
// Establece conexión a la base de datos y luego inicia el servidor
(0, db_1.connectDB)().then(() => {
    app_1.app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
});
//# sourceMappingURL=server.js.map