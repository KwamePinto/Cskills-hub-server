import { Router } from 'express';
import { getCourseProgress, getProgressSummary } from '../controllers/progress.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.get('/summary', getProgressSummary);
router.get('/:courseId', getCourseProgress);

export default router;
