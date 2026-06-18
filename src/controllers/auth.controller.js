import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

const signToken = (id, secret, expiresIn) =>
  jwt.sign({ id }, secret, { expiresIn });

const sendTokens = (res, statusCode, entity, message, role = 'user') => {
  const accessToken = signToken(
    entity._id,
    process.env.JWT_ACCESS_SECRET,
    process.env.JWT_ACCESS_EXPIRES || '15m'
  );
  const refreshToken = signToken(
    entity._id,
    process.env.JWT_REFRESH_SECRET,
    process.env.JWT_REFRESH_EXPIRES || '7d'
  );

  const data = entity.toObject ? entity.toObject() : { ...entity };
  delete data.password;

  res.status(statusCode).json(
    new ApiResponse(statusCode, { accessToken, refreshToken, role, user: data }, message)
  );
};

// ── Validators ────────────────────────────────────────────────
export const registerValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

export const loginValidators = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

export const changePasswordValidators = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
];

// ── Controllers ───────────────────────────────────────────────
export const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const exists = await User.findOne({ email }).lean();
  if (exists) throw new ApiError(400, 'Email already in use');
  const user = await User.create({ name, email, password });
  sendTokens(res, 201, user, 'Account created successfully');
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  if (!user.isActive) throw new ApiError(401, 'Account has been deactivated');
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });
  sendTokens(res, 200, user, 'Login successful');
});

export const adminLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin || !(await admin.comparePassword(password))) {
    throw new ApiError(401, 'Invalid credentials');
  }
  if (!admin.isActive) throw new ApiError(401, 'Admin account has been deactivated');
  admin.lastLogin = new Date();
  await admin.save({ validateBeforeSave: false });
  sendTokens(res, 200, admin, 'Admin login successful', admin.role);
});

export const refreshToken = catchAsync(async (req, res) => {
  const token = req.body.refreshToken;
  if (!token) throw new ApiError(401, 'Refresh token required');

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  // Try user first, then admin
  const user = await User.findById(decoded.id).lean();
  const admin = !user ? await Admin.findById(decoded.id).lean() : null;
  const entity = user || admin;
  if (!entity) throw new ApiError(401, 'Account not found');

  const accessToken = signToken(
    entity._id,
    process.env.JWT_ACCESS_SECRET,
    process.env.JWT_ACCESS_EXPIRES || '15m'
  );

  res.status(200).json(new ApiResponse(200, { accessToken }, 'Token refreshed'));
});

export const logout = catchAsync(async (_req, res) => {
  res.status(200).json(new ApiResponse(200, null, 'Logged out successfully'));
});

export const changePassword = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.comparePassword(req.body.currentPassword))) {
    throw new ApiError(401, 'Current password is incorrect');
  }
  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json(new ApiResponse(200, null, 'Password updated successfully'));
});
