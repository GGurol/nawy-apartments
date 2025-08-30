import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apartmentsRouter from './routes/apartments';
import { errorHandler } from './middlewares/error';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(morgan('combined'));
app.use(express.json());
app.use(cors({ 
  origin: process.env.CORS_ORIGIN || "*" 
}));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Routes
app.use('/api/apartments', apartmentsRouter);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🏠 Apartments API: http://localhost:${PORT}/api/apartments`);
}).on('error', (error) => {
  console.error('❌ Server failed to start:', error);
  process.exit(1);
});
