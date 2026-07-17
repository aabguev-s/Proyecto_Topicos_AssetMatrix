//routes/cryptoRoutes.ts

import { Router } from 'express';
import { CryptoController } from '../controllers/cryptoController';
import { validate } from '../utils/validateSchema';
import { createTransactionSchema, getCoinParamsSchema, gettx_idParamsSchema} from '../schemas/cryptoSchema';

const router = Router();
const controller = new CryptoController();

router.route('/')
.get(controller.getAll);

router.route('/portfolio')
.post(validate(createTransactionSchema), controller.create)

router.route('/analytics')
  .get(controller.getAnalytics);

router.route('/:coin')
  .get(validate(getCoinParamsSchema), controller.getById);

router.route('/:tx_id')
  .delete(validate(gettx_idParamsSchema), controller.delete);

router.route('/market/:coin')
  .get(validate(getCoinParamsSchema), controller.getMarketData);

export default router;