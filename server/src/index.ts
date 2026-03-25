import dotenv from 'dotenv';
import app from './app';
import connectDB from './db/connectDB';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
