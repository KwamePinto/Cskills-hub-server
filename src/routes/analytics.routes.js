import { Router } from 'express';
import {
  getOverview,
  getUserStats,
  getCourseStats,
  getEnrollmentStats,
  getQuizStats,
} from '../controllers/analytics.controller.js';
import { protectAdmin } from '../middleware/admin.middleware.js';

const router = Router();

router.use(protectAdmin);

router.get('/overview', getOverview);
router.get('/users', getUserStats);
router.get('/courses', getCourseStats);
router.get('/enrollments', getEnrollmentStats);
router.get('/quizzes', getQuizStats);

export default router;
