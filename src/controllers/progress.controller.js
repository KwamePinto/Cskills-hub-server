import Enrollment from '../models/Enrollment.js';
import Progress from '../models/Progress.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const getCourseProgress = catchAsync(async (req, res) => {
  const enrollment = await Enrollment.findOne({
    user: req.user._id,
    course: req.params.courseId,
  }).lean();
  if (!enrollment) throw new ApiError(403, 'You are not enrolled in this course');

  const progress = await Progress.findOne({ user: req.user._id, course: req.params.courseId })
    .populate('completedLessons', 'title order')
    .populate('lastAccessedLesson', 'title order chapter')
    .lean();

  res.status(200).json(new ApiResponse(200, { enrollment, progress }, 'Progress fetched'));
});

export const getProgressSummary = catchAsync(async (req, res) => {
  const progress = await Progress.find({ user: req.user._id })
    .populate('course', 'title slug thumbnail totalLessons totalQuizzes')
    .select('course completionPercentage completedLessons completedQuizzes lastAccessedAt')
    .lean();

  res.status(200).json(new ApiResponse(200, progress, 'Progress summary fetched'));
});
