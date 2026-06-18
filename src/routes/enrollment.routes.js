import { Router } from 'express';
import {
  enroll,
  unenroll,
  getMyEnrollments,
  adminGetEnrollments,
} from '../controllers/enrollment.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { protectAdmin } from '../middleware/admin.middleware.js';

const router = Router();

router.post('/:courseId', protect, enroll);
router.delete('/:courseId', protect, unenroll);
router.get('/', protect, getMyEnrollments);
router.get('/admin/all', protectAdmin, adminGetEnrollments);

export default router;
