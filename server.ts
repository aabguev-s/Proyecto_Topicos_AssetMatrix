import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { connectDB } from './src/config/db';
import { specs } from './src/config/swagger';
import cryptoRoutes from './src/routes/cryptoRoutes';
import stockRoutes from './src/routes/stockRoutes';

dotenv.config();

const app = express();
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
  res.status(500).json({ error: 'Something went wrong internally.' });
});

// Establece conexión a la base de datos y luego inicia el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
});