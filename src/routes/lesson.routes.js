import { Router } from 'express';
import {
  createLesson, lessonValidators,
  updateLesson,
  deleteLesson,
  getLesson,
  getLessonAdmin,
  completeLesson,
} from '../controllers/lesson.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { protectAdmin } from '../middleware/admin.middleware.js';
import validate from '../middleware/validate.middleware.js';

const router = Router();

// Admin
router.post('/chapters/:chapterId/lessons', protectAdmin, lessonValidators, validate, createLesson);
router.put('/:id', protectAdmin, updateLesson);
router.delete('/:id', protectAdmin, deleteLesson);
router.get('/admin/:id', protectAdmin, getLessonAdmin);

// User (enrolled)
router.get('/:id', protect, getLesson);
router.post('/:id/complete', protect, completeLesson);

export default router;
