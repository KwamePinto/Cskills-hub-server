import { Router } from 'express';
import {
  createQuiz, quizValidators,
  updateQuiz,
  deleteQuiz,
  getQuiz,
  getQuizAdmin,
  submitQuiz,
} from '../controllers/quiz.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { protectAdmin } from '../middleware/admin.middleware.js';
import validate from '../middleware/validate.middleware.js';

const router = Router();

// Admin
router.post('/chapters/:chapterId/quizzes', protectAdmin, quizValidators, validate, createQuiz);
router.put('/:id', protectAdmin, updateQuiz);
router.delete('/:id', protectAdmin, deleteQuiz);
router.get('/admin/:id', protectAdmin, getQuizAdmin);

// User (enrolled)
router.get('/:id', protect, getQuiz);
router.post('/:id/submit', protect, submitQuiz);

export default router;
