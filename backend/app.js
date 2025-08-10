import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import path from 'path';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorMiddleware.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// ✅ Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
import adminRoutes from './routes/adminRoutes.js';
import heroRoutes from './routes/heroRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

app.use('/api/admin', adminRoutes);
app.use('/api/hero-sections', heroRoutes);
app.use('/api/video', videoRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;
