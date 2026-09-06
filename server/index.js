import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
}));
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/image', imageRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from Server!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    const PORT= process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();
