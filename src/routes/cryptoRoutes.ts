//routes/cryptoRoutes.ts

import { Router } from 'express';
import { CryptoController } from '../controllers/cryptoController';
import { validate } from '../middlewares/validateMiddleware';
import { getCoinParamsSchema} from '../schemas/cryptoSchema';

const router = Router();
const controller = new CryptoController();

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
  .get(validate(getCoinParamsSchema), controller.getMarketData);

export default router;