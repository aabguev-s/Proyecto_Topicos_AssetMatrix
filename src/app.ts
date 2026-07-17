import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import cryptoRoutes from './routes/cryptoRoutes';
import stockRoutes from './routes/stockRoutes';

export const createApp = (options: { includeSwagger?: boolean } = {}): express.Application => {
  const { includeSwagger = true } = options;
  const app = express();

  app.use(cors());
  app.use(express.json());

  if (includeSwagger) {
    const { specs } = require('./config/swagger') as typeof import('./config/swagger');
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  app.use('/api/crypto', cryptoRoutes);
  app.use('/api/stock', stockRoutes);

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack || err);
    const message = err && err.message ? String(err.message) : 'Something went wrong internally.';
    const statusCode = err && err.status && Number.isInteger(err.status) ? err.status : 500;
    res.status(statusCode).json({ error: message });
  });

  return app;
};

export const app = createApp();
