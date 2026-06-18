import { Router } from 'express';
import {
  getPublicSettings,
  getSettings,
  updateSettings,
} from '../controllers/settings.controller.js';
import { protectAdmin } from '../middleware/admin.middleware.js';

const router = Router();

router.get('/', getPublicSettings);
router.get('/admin', protectAdmin, getSettings);
router.put('/admin', protectAdmin, updateSettings);

export default router;
