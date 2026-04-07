import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import quizRoutes from './routes/quiz.js';
import phishingRoutes from './routes/phishing.js';
import creditsRoutes from './routes/credits.js';
import thunderRoutes from './routes/thunder.js';
import adminRoutes from './routes/admin.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/phishing', phishingRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/credits', creditsRoutes);
app.use('/api/thunder', thunderRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Server running', mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' });
});

// MongoDB connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
})();

mongoose.connection.on('connected', () => console.log('📡 Mongoose connected'));
mongoose.connection.on('error', (err) => console.error('❌ Mongoose error:', err));
mongoose.connection.on('disconnected', () => console.log('⚠️ Mongoose disconnected'));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});