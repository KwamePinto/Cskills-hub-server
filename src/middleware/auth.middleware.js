import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) throw new ApiError(401, 'Not authenticated. Please log in.');

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  const user = await User.findById(decoded.id).lean();
  if (!user) throw new ApiError(401, 'User no longer exists.');
  if (!user.isActive) throw new ApiError(401, 'Account has been deactivated.');

  req.user = user;
  next();
});
