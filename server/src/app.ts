import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import adminAuthRoutes from './routes/adminAuthRoutes';
import propertyRoutes from './routes/propertyRoutes';
import leadRoutes from './routes/leadRoutes';

const app = express();

// Middleware configuration
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(helmet({ crossOriginResourcePolicy: false })); // allows serving images to frontend
app.use(morgan('dev'));

// Serve uploaded images statically 
import path from 'path';
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Gupta Real Estate API is healthy' });
});

// Mounted Phase 2 Routes
app.use('/api/admin', adminAuthRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/leads', leadRoutes);

export default app;
