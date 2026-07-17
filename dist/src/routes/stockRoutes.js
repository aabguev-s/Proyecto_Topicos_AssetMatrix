"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stockController_1 = require("../controllers/stockController");
const validateMiddleware_1 = require("../middlewares/validateMiddleware");
const stockParamsSchema_1 = require("../schemas/stockParamsSchema");
const router = (0, express_1.Router)();
const controller = new stockController_1.StockController();
// Ruta base /stocks, declarado en server.ts
router.route('/')
    .get(controller.getAllDBTrackedTickers.bind(controller));
router.route('/history')
    .get(controller.getHistoricTrendsTracked.bind(controller));
router.route('/watch')
    .post((0, validateMiddleware_1.validate)(stockParamsSchema_1.checkSymbolOnlySchema), controller.startTrackingTicker);
router.route('/search/:keyword')
    .get((0, validateMiddleware_1.validate)(stockParamsSchema_1.checkKeywordOnlySchema), controller.searchByKeyword);
router.route('/:id')
    .delete((0, validateMiddleware_1.validate)(stockParamsSchema_1.checkIdOnlySchema), controller.removeTickerFromTracking);
router.route('/:symbol')
    .get((0, validateMiddleware_1.validate)(stockParamsSchema_1.checkSymbolOnlySchemaParams), controller.getCurrentTickerData);
exports.default = router;
//# sourceMappingURL=stockRoutes.js.map