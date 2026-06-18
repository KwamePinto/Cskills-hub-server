import { body } from 'express-validator';
import User from '../models/User.js';
import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { getPaginationParams, paginationMeta } from '../utils/pagination.js';

// ── User Management ───────────────────────────────────────────
export const getUsers = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const { search, isActive } = req.query;

  const filter = {};
  if (search) filter.$text = { $search: search };
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    User.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, { users, pagination: paginationMeta(total, page, limit) }, 'Users fetched')
  );
});

export const getUser = catchAsync(async (req, res) => {
  const user = await User.findById(req.params.id).lean();
  if (!user) throw new ApiError(404, 'User not found');
  res.status(200).json(new ApiResponse(200, user, 'User fetched'));
});

export const updateUserStatus = catchAsync(async (req, res) => {
  const { isActive } = req.body;
  if (isActive === undefined) throw new ApiError(400, 'isActive field is required');

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isActive },
    { new: true }
  ).lean();
  if (!user) throw new ApiError(404, 'User not found');

  res.status(200).json(new ApiResponse(200, user, `User ${isActive ? 'activated' : 'deactivated'}`));
});

export const deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');
  res.status(200).json(new ApiResponse(200, null, 'User deleted'));
});

// ── Admin Management ──────────────────────────────────────────
export const createAdminValidators = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['admin', 'superadmin']).withMessage('Invalid role'),
];

export const getAdmins = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const [admins, total] = await Promise.all([
    Admin.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Admin.countDocuments(),
  ]);
  res.status(200).json(
    new ApiResponse(200, { admins, pagination: paginationMeta(total, page, limit) }, 'Admins fetched')
  );
});

export const createAdmin = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await Admin.findOne({ email }).lean();
  if (exists) throw new ApiError(400, 'Email already in use');
  const admin = await Admin.create({ name, email, password, role, createdBy: req.admin._id });
  const { password: _pw, ...adminData } = admin.toObject();
  res.status(201).json(new ApiResponse(201, adminData, 'Admin created'));
});

export const updateAdmin = catchAsync(async (req, res) => {
  const allowed = ['name', 'role', 'isActive'];
  const updates = {};
  allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

  const admin = await Admin.findByIdAndUpdate(req.params.id, updates, { new: true }).lean();
  if (!admin) throw new ApiError(404, 'Admin not found');
  res.status(200).json(new ApiResponse(200, admin, 'Admin updated'));
});

export const deleteAdmin = catchAsync(async (req, res) => {
  if (req.params.id === String(req.admin._id)) {
    throw new ApiError(400, 'You cannot delete your own account');
  }
  const admin = await Admin.findByIdAndDelete(req.params.id);
  if (!admin) throw new ApiError(404, 'Admin not found');
  res.status(200).json(new ApiResponse(200, null, 'Admin deleted'));
});
