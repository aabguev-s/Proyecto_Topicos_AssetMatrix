"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockController_1 = require("../controllers/stockController");
const validateMiddleware_1 = require("../middlewares/validateMiddleware");
const stockSchema_1 = require("../schemas/stockSchema");
const router = (0, express_1.Router)();
const controller = new stockController_1.StockController();
/**
 * @openapi
 * /api/stocks/watch:
 *   get:
 *     summary: Obtiene todos los activos bursátiles guardados en la lista de seguimiento
 *     tags: [Stocks]
 *     responses:
 *       200:
 *         description: Lista de activos en seguimiento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   symbol:
 *                     type: string
 *                   companyName:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error al consultar la base de datos
 *   post:
 *     summary: Guarda un activo bursátil en la lista de seguimiento
 *     tags: [Stocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [symbol]
 *             properties:
 *               symbol:
 *                 type: string
 *                 description: 'Stock symbol must be a non-empty string and cannot be only numbers'
 *                 example: MSFT
 *                 pattern: '^.+$'
 *               companyName:
 *                 type: string
 *                 example: Microsoft Corporation
 *     responses:
 *       201:
 *         description: Activo bursátil guardado en la lista de seguimiento
 *       400:
 *         description: Error de validación - symbol debe ser un string no vacío y body no puede ser nulo
 *       409:
 *         description: Error de ticker duplicado
 *       500:
 *         description: Error interno al guardar el activo en la base de datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
// Las rutas del router siguen igual
router.get('/watch', controller.getWatchlist);
router.post('/watch', (0, validateMiddleware_1.validate)(stockSchema_1.watchStockSchema), controller.addToWatchlist);
/**
 * @openapi
 * /api/stocks/{symbol}:
 *   get:
 *     summary: Consulta el precio y volumen real de un activo bursátil
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *           description: 'Stock symbol debe ser un string no vacío'
 *         example: MSFT
 *     responses:
 *       200:
 *         description: Datos del activo encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                 price:
 *                   type: number
 *                 volume:
 *                   type: integer
 *                 change:
 *                   type: number
 *                 changePercent:
 *                   type: string
 *                 latestTradingDay:
 *                   type: string
 *       404:
 *         description: Símbolo no encontrado
 *       500:
 *         description: Error de conexión con la API externa
 */
router.get('/:symbol', (0, validateMiddleware_1.validate)(stockSchema_1.stockSymbolParamsSchema), controller.getQuote);
exports.default = router;
//# sourceMappingURL=stockRoutes.js.map