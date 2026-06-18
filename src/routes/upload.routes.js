import { Router } from 'express';
import {
  uploadImage,
  uploadImageAdmin,
  uploadVideo,
  uploadFile,
  deleteUpload,
} from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { protectAdmin } from '../middleware/admin.middleware.js';

const router = Router();

router.post('/image',       protect,      ...uploadImage);       // user profile pics
router.post('/admin/image', protectAdmin, ...uploadImageAdmin);  // lesson images
router.post('/video',       protectAdmin, ...uploadVideo);
router.post('/file',        protectAdmin, ...uploadFile);
router.delete('/',          protectAdmin, deleteUpload);

export default router;
