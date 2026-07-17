"use strict";
//routes/cryptoRoutes.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cryptoController_1 = require("../controllers/cryptoController");
const validateMiddleware_1 = require("../middlewares/validateMiddleware");
const cryptoSchema_1 = require("../schemas/cryptoSchema");
const router = (0, express_1.Router)();
const controller = new cryptoController_1.CryptoController();
router.route('/')
    .get(controller.getAll);
router.route('/portfolio')
    .post((0, validateMiddleware_1.validate)(cryptoSchema_1.createTransactionSchema), controller.create);
router.route('/analytics')
    .get(controller.getAnalytics);
router.route('/:coin')
    .get((0, validateMiddleware_1.validate)(cryptoSchema_1.getCoinParamsSchema), controller.getById);
router.route('/:tx_id')
    .delete((0, validateMiddleware_1.validate)(cryptoSchema_1.gettx_idParamsSchema), controller.delete);
router.route('/market/:coin')
    .get((0, validateMiddleware_1.validate)(cryptoSchema_1.getCoinParamsSchema), controller.getMarketData);
exports.default = router;
//# sourceMappingURL=cryptoRoutes.js.map