import dotenv from 'dotenv';
import express from 'express';
import { app } from './src/app';
import { connectDB } from './src/config/db';
import { specs } from './src/config/swagger';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import cryptoRoutes from './src/routes/cryptoRoutes';
import stockRoutes from './src/routes/stockRoutes';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rutas de la Interfaz Gráfica de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rutas de la API
app.use('/api/cryptos', cryptoRoutes);
app.use('/api/stock', stockRoutes);

// Manejador de Errores Global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  // If the error originates from an external API client (AlphaVantage / CoinGecko),
  // prefer returning the original message so the user sees token-limit or provider hints.
  const msg = err && err.message ? String(err.message) : null;
  if (msg && (msg.includes('Alpha Vantage') || msg.includes('CoinGecko') || msg.includes('API ha fallado') || msg.includes('Respuesta inválida') || msg.includes('Error de la API externa'))) {
    return res.status(500).json({ error: msg });
  }
  res.status(500).json({ error: 'Something went wrong internally.' });
});

// Establece conexión a la base de datos y luego inicia el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
});
