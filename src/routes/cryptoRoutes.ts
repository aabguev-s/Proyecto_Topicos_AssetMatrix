import { Router } from 'express';
import { CryptoController } from '../controllers/cryptoController';
import { validate } from '../middlewares/validateMiddleware';
import { createCryptoSchema, updateCryptoSchema, getCryptoParamsSchema } from '../schemas/cryptoSchema';

const router = Router();
const controller = new CryptoController();

// Rutas de Prueba. Serán reemplazadas por las rutas ya definidas en ../config/swagger.ts

router.route('/')
  .post(validate(createCryptoSchema), controller.create)
  .get(controller.getAll);

router.route('/:id')
  .get(validate(getCryptoParamsSchema), controller.getById)
  .put(validate(updateCryptoSchema), controller.update)
  .delete(validate(getCryptoParamsSchema), controller.delete);

export default router;