import { Router } from 'express';
import {
  register, registerValidators,
  login, loginValidators,
  adminLogin,
  refreshToken,
  logout,
  changePassword, changePasswordValidators,
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import validate from '../middleware/validate.middleware.js';

const router = Router();

router.post('/register', registerValidators, validate, register);
router.post('/login', loginValidators, validate, login);
router.post('/admin/login', loginValidators, validate, adminLogin);
router.post('/refresh', refreshToken);
router.post('/logout', logout);
router.put('/change-password', protect, changePasswordValidators, validate, changePassword);

export default router;
