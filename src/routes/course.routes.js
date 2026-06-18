import { Router } from 'express';
import {
  getCourses,
  getCourse,
  getAdminCourses,
  createCourse, courseValidators,
  updateCourse,
  deleteCourse,
  publishCourse,
  draftCourse,
  getEnrolledCourseDetail,
} from '../controllers/course.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { protectAdmin } from '../middleware/admin.middleware.js';
import validate from '../middleware/validate.middleware.js';

const router = Router();

// Public
router.get('/', getCourses);
router.get('/:slug', getCourse);

// Enrolled user — full course detail with chapters
router.get('/:id/learn', protect, getEnrolledCourseDetail);

// Admin
router.get('/admin/all', protectAdmin, getAdminCourses);
router.post('/admin', protectAdmin, courseValidators, validate, createCourse);
router.put('/admin/:id', protectAdmin, updateCourse);
router.delete('/admin/:id', protectAdmin, deleteCourse);
router.patch('/admin/:id/publish', protectAdmin, publishCourse);
router.patch('/admin/:id/draft', protectAdmin, draftCourse);

export default router;
