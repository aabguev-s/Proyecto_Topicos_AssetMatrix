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

  app.use('/api/stocks', stockRoutes);
  app.use('/api/cryptos', cryptoRoutes);

  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong internally.' });
  });

  return app;
};

export const app = createApp();
