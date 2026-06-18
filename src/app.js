import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import errorHandler from './middleware/error.middleware.js';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import adminRoutes from './routes/admin.routes.js';
import courseRoutes from './routes/course.routes.js';
import chapterRoutes from './routes/chapter.routes.js';
import lessonRoutes from './routes/lesson.routes.js';
import quizRoutes from './routes/quiz.routes.js';
import enrollmentRoutes from './routes/enrollment.routes.js';
import progressRoutes from './routes/progress.routes.js';
import complaintRoutes from './routes/complaint.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import uploadRoutes from './routes/upload.routes.js';

const app = express();

// ── Security & Parsing ────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ── Rate Limiting ─────────────────────────────────────────────
// TODO: re-enable before production
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: { success: false, message: 'Too many requests, please try again after 15 minutes.' },
//   standardHeaders: true,
//   legacyHeaders: false,
// });
//
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 20,
//   message: { success: false, message: 'Too many login attempts, please try again later.' },
//   standardHeaders: true,
//   legacyHeaders: false,
// });
//
// app.use('/api', limiter);
// app.use('/api/auth', authLimiter);

// ── Health Check ──────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'CTC School API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/uploads', uploadRoutes);

// ── 404 Handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global Error Handler ──────────────────────────────────────
app.use(errorHandler);

export default app;
