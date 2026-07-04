//middlewares/validateMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const schemaShape = schema.shape;

      if (schemaShape.body && req.body) {
        req.body = await schemaShape.body.parseAsync(req.body);
      }
      if (schemaShape.params && req.params) {
        req.params = await schemaShape.params.parseAsync(req.params) as any;
      }
      if (schemaShape.query && req.query) {
        req.query = await schemaShape.query.parseAsync(req.query) as any;
      }

      return next();
    } catch (error) {
      console.error("Zod Validation Interceptor Caught An Error:", error);

      if (error instanceof ZodError) {
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