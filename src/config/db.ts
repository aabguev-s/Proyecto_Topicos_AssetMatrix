import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crypto_db';
const RETRY_INTERVAL = 5000; // 5 seconds

export const connectDB = async (): Promise<void> => {
    
    if (!MONGO_URI) {
        console.error('Error: MONGO_URI no está definida en las variables de entorno.');
        process.exit(1);
    }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB successfully connected.');
  } catch (err) {
    console.error('MongoDB connection failed. Retrying in 5 seconds...', err);
    setTimeout(connectDB, RETRY_INTERVAL);
  }
};