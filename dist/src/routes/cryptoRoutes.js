"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cryptoController_1 = require("../controllers/cryptoController");
const validateMiddleware_1 = require("../middlewares/validateMiddleware");
const cryptoSchema_1 = require("../schemas/cryptoSchema");
const router = (0, express_1.Router)();
const controller = new cryptoController_1.CryptoController();
// Rutas de Prueba. Serán reemplazadas por las rutas ya definidas en ../config/swagger.ts
/**
 * @openapi
 * /api/cryptos:
 *   post:
 *     summary: Create a new cryptocurrency token entry
 *     tags: [Cryptos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, symbol, price]
 *             properties:
 *               name:
 *                 type: string
 *               symbol:
 *                 type: string
 *               price:
 *                 type: number
 *               marketCap:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *   get:
 *     summary: Retrieve complete index list of tracking crypto metrics
 *     tags: [Cryptos]
 *     responses:
 *       200:
 *         description: Success
 */
router.route('/')
    .post((0, validateMiddleware_1.validate)(cryptoSchema_1.createCryptoSchema), controller.create)
    .get(controller.getAll);
/**
 * @openapi
 * /api/cryptos/{id}:
 *   get:
 *     summary: Get single asset metrics profile
 *     tags: [Cryptos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *   put:
 *     summary: Mutate profile traits data for matching resource id node
 *     tags: [Cryptos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated
 *   delete:
 *     summary: Purge record out of active store
 *     tags: [Cryptos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No Content
 */
router.route('/:id')
    .get((0, validateMiddleware_1.validate)(cryptoSchema_1.getCryptoParamsSchema), controller.getById)
    .put((0, validateMiddleware_1.validate)(cryptoSchema_1.updateCryptoSchema), controller.update)
    .delete((0, validateMiddleware_1.validate)(cryptoSchema_1.getCryptoParamsSchema), controller.delete);
exports.default = router;
//# sourceMappingURL=cryptoRoutes.js.map