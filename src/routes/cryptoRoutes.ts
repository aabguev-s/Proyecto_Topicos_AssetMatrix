//routes/cryptoRoutes.ts

import { Router } from 'express';
import { CryptoController } from '../controllers/cryptoController';
import { validate } from '../middlewares/validateMiddleware';
import { createCryptoSchema, updateCryptoSchema, getCryptoParamsSchema, getCoinParamsSchema} from '../schemas/cryptoSchema';

const router = Router();
const controller = new CryptoController();

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
 *             required: [id, name, symbol, transactions]
 *             properties:
 *               id: { type: string, example: "bitcoin" }
 *               name: { type: string, example: "Bitcoin" }
 *               symbol: { type: string, example: "BTC" }
 *               transactions: 
 *                 type: array
 *                 items:
 *                   type: object
 *                   required: [current_price, total_volume, createdAt]
 *                   properties:
 *                     current_price: { type: number, example: 62599 }
 *                     total_volume: { type: number, example: 25762387797 }
 *                     createdAt: { type: string, example: "2024-01-01T00:00:00Z" }
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
  .post(validate(createCryptoSchema), controller.create)
  .get(controller.getAll);

/**
 * @openapi
 * /api/cryptos/analytics:
 *   get:
 *     summary: Get balance total and analytics summary from transaction history
 *     tags: [Cryptos]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.route('/analytics')
  .get(controller.getAnalytics);

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
 *         schema: { type: string }
 *         description: El ID manual de la moneda (ej. bitcoin)
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
 *         schema: { type: string }
 *         description: El ID manual de la moneda (ej. bitcoin)
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               symbol: { type: string }
 *               transactions: 
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     current_price: { type: number }
 *                     total_volume: { type: number }
 *                     createdAt: { type: string }
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
 *         schema: { type: string }
 *         description: ID de la transacción a eliminar
 *     responses:
 *       204:
 *         description: No Content
 */
router.route('/:id')
  .get(validate(getCryptoParamsSchema), controller.getById)
  .put(validate(updateCryptoSchema), controller.update)
  .delete(validate(getCryptoParamsSchema), controller.delete);

/**
 * @openapi
 * /api/cryptos/market/{coin}:
 *   get:
 *     summary: Obtener capitalización de mercado y fluctuación 24h para una criptomoneda
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
  .get(validate(getCoinParamsSchema), controller.getMarketData);

export default router;