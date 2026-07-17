import { Router } from 'express';
import { StockController } from '../controllers/stockController';
import { validate } from '../utils/validateSchema';
import { checkIdOnlySchema, checkSymbolOnlySchema, checkSymbolOnlySchemaParams, checkKeywordOnlySchema } from '../schemas/stockParamsSchema';

const router = Router();
const controller = new StockController();

// Ruta base /stocks, declarado en server.ts
router.route('/')
    .get(controller.getAllDBTrackedTickers.bind(controller));

router.route('/history')
    .get(controller.getHistoricTrendsTracked.bind(controller));

router.route('/watch')
    .post(validate(checkSymbolOnlySchema), controller.startTrackingTicker);

router.route('/search/:keyword')
    .get(validate(checkKeywordOnlySchema), controller.searchByKeyword);

router.route('/:id')
    .delete(validate(checkIdOnlySchema), controller.removeTickerFromTracking);

router.route('/:symbol')
    .get(validate(checkSymbolOnlySchemaParams), controller.getCurrentTickerData);

export default router;