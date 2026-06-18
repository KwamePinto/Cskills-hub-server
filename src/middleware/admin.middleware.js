import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

export const protectAdmin = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) throw new ApiError(401, 'Not authenticated.');

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  const admin = await Admin.findById(decoded.id).lean();
  if (!admin) throw new ApiError(401, 'Admin no longer exists.');
  if (!admin.isActive) throw new ApiError(401, 'Admin account has been deactivated.');

  req.admin = admin;
  next();
});

export const requireSuperAdmin = (req, _res, next) => {
  if (req.admin?.role !== 'superadmin') {
    return next(new ApiError(403, 'Only superadmins can perform this action.'));
  }
  next();
};
