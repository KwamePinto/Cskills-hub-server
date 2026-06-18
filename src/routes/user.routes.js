import { Router } from 'express';
import {
  getMe,
  updateMe, updateProfileValidators,
  updateAvatar,
  getMyEnrollments,
  getMyProgress,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';
import { uploadImage } from '../controllers/upload.controller.js';

const router = Router();

router.use(protect);

router.get('/me', getMe);
router.put('/me', updateProfileValidators, validate, updateMe);
router.post('/me/avatar', uploadImage[0], updateAvatar);
router.get('/me/enrollments', getMyEnrollments);
router.get('/me/progress', getMyProgress);

export default router;
