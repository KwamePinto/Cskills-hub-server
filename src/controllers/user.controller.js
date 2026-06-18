import { body } from 'express-validator';
import User from '../models/User.js';
import Enrollment from '../models/Enrollment.js';
import Progress from '../models/Progress.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { getPaginationParams, paginationMeta } from '../utils/pagination.js';

export const updateProfileValidators = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('bio').optional().isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),
  body('socialLinks.website').optional().isURL().withMessage('Invalid website URL'),
  body('socialLinks.linkedin').optional().isURL().withMessage('Invalid LinkedIn URL'),
  body('socialLinks.twitter').optional().isURL().withMessage('Invalid Twitter URL'),
  body('socialLinks.github').optional().isURL().withMessage('Invalid GitHub URL'),
];

export const getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user._id).lean();
  res.status(200).json(new ApiResponse(200, user, 'Profile fetched'));
});

export const updateMe = catchAsync(async (req, res) => {
  const allowed = ['name', 'bio', 'socialLinks', 'preferences'];
  const updates = {};
  allowed.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).lean();

  res.status(200).json(new ApiResponse(200, user, 'Profile updated'));
});

export const updateAvatar = catchAsync(async (req, res) => {
  if (!req.uploadedUrl) {
    const ApiError = (await import('../utils/ApiError.js')).default;
    throw new ApiError(400, 'No image uploaded');
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.uploadedUrl },
    { new: true }
  ).lean();
  res.status(200).json(new ApiResponse(200, { avatar: user.avatar }, 'Avatar updated'));
});

export const getMyEnrollments = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const { status } = req.query;

  const filter = { user: req.user._id };
  if (status) filter.status = status;

  const [enrollments, total] = await Promise.all([
    Enrollment.find(filter)
      .populate('course', 'title slug thumbnail difficulty category estimatedDuration totalLessons totalQuizzes')
      .sort({ enrolledAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Enrollment.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, { enrollments, pagination: paginationMeta(total, page, limit) }, 'Enrollments fetched')
  );
});

export const getMyProgress = catchAsync(async (req, res) => {
  const progress = await Progress.find({ user: req.user._id })
    .populate('course', 'title slug thumbnail totalLessons totalQuizzes')
    .lean();

  res.status(200).json(new ApiResponse(200, progress, 'Progress summary fetched'));
});
