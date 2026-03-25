import mongoose from 'mongoose';

export let isMockMode = false;

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri || mongoUri.includes('localhost') && !process.env.DOCKER_RUNNING) {
       console.warn('⚡ Local MongoDB not detected. Activating High-Speed Demo Mode.');
       isMockMode = true;
       return;
    }

    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
    console.log(`🚀 MongoDB Connected: ${conn.connection.host}`);
    isMockMode = false;
  } catch (error: any) {
    console.error(`⚠️ Database Unavailable: ${error.message}. Switching to Demo Mode.`);
    isMockMode = true;
  }
};

mongoose.connection.on('disconnected', () => {
  if (!isMockMode) {
    console.warn('MongoDB disconnected! Attempting to reconnect...');
    connectDB();
  }
});

export default connectDB;
