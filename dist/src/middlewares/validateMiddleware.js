"use strict";
//middlewares/validateMiddleware.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const validate = (schema) => {
    return async (req, res, next) => {
        try {
            const schemaShape = schema.shape;
            if (schemaShape.body && req.body) {
                req.body = await schemaShape.body.parseAsync(req.body);
            }
            if (schemaShape.params && req.params) {
                req.params = await schemaShape.params.parseAsync(req.params);
            }
            if (schemaShape.query && req.query) {
                req.query = await schemaShape.query.parseAsync(req.query);
            }
            return next();
        }
        catch (error) {
            console.error("Zod Validation Interceptor Caught An Error:", error);
            if (error instanceof zod_1.ZodError) {
                res.status(400).json({
                    status: 'fail',
                    errors: error.issues.map((issue) => ({
                        field: issue.path.join('.'),
                        message: issue.message,
                    })),
                });
                return;
            }
            res.status(500).json({ error: 'Internal validation framework failure.' });
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validateMiddleware.js.map