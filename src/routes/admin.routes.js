import { Router } from 'express';
import {
  getUsers, getUser, updateUserStatus, deleteUser,
  getAdmins, createAdmin, createAdminValidators, updateAdmin, deleteAdmin,
} from '../controllers/admin.controller.js';
import { protectAdmin } from '../middleware/admin.middleware.js';
import validate from '../middleware/validate.middleware.js';

const router = Router();

router.use(protectAdmin);

// User management
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id/status', updateUserStatus);
router.delete('/users/:id', deleteUser);

// Admin management
router.get('/admins', getAdmins);
router.post('/admins', createAdminValidators, validate, createAdmin);
router.put('/admins/:id', updateAdmin);
router.delete('/admins/:id', deleteAdmin);

export default router;
