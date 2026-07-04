"use strict";
//routes/cryptoRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cryptoController_1 = require("../controllers/cryptoController");
const validateMiddleware_1 = require("../middlewares/validateMiddleware");
const cryptoSchema_1 = require("../schemas/cryptoSchema");
const router = (0, express_1.Router)();
const controller = new cryptoController_1.CryptoController();
/**
 * @openapi
 * /api/cryptos/market/{coin}:
 *   get:
 *     summary: Get market cap and 24h fluctuation for a crypto asset
 *     tags: [Cryptos]
 *     parameters:
 *       - in: path
 *         name: coin
 *         required: true
 *         schema:
 *           type: string
 *         example: bitcoin
 *         description: CoinGecko coin id (no es el ticker, ej. usar "bitcoin" y no "BTC")
 *     responses:
 *       200:
 *         description: Datos de mercado obtenidos con éxito
 *       404:
 *         description: Activo no encontrado en CoinGecko
 */
router.route('/market/:coin')
    .get((0, validateMiddleware_1.validate)(cryptoSchema_1.getCoinParamsSchema), controller.getMarketData);
exports.default = router;
//# sourceMappingURL=cryptoRoutes.js.map