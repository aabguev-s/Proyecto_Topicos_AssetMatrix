import { Router } from 'express';
import { CryptoController } from '../controllers/cryptoController';
import { validate } from '../middlewares/validateMiddleware';
import { createCryptoSchema, updateCryptoSchema, getCryptoParamsSchema } from '../schemas/cryptoSchema';

const router = Router();
const controller = new CryptoController();

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
  .post(validate(createCryptoSchema), controller.create)
  .get(controller.getAll);

/**
 * @openapi
 * /api/cryptos/analytics:
 * get:
 * summary: Get balance total and analytics summary from transaction history
 * tags: [Cryptos]
 * responses:
 * 200:
 * description: Success
 * 500:
 * description: Internal Server Error
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
  .get(validate(getCryptoParamsSchema), controller.getById)
  .put(validate(updateCryptoSchema), controller.update)
  .delete(validate(getCryptoParamsSchema), controller.delete);

export default router;