import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import Progress from '../models/Progress.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { getPaginationParams, paginationMeta } from '../utils/pagination.js';

export const enroll = catchAsync(async (req, res) => {
  const course = await Course.findOne({ _id: req.params.courseId, status: 'published' }).lean();
  if (!course) throw new ApiError(404, 'Course not found');

  const existing = await Enrollment.findOne({ user: req.user._id, course: course._id }).lean();
  if (existing) throw new ApiError(400, 'Already enrolled in this course');

  const enrollment = await Enrollment.create({ user: req.user._id, course: course._id });

  // Create progress record and update enrollment count
  await Promise.all([
    Progress.create({
      user: req.user._id,
      course: course._id,
      enrollment: enrollment._id,
      totalItems: course.totalLessons + course.totalQuizzes,
    }),
    Course.findByIdAndUpdate(course._id, { $inc: { enrollmentCount: 1 } }),
  ]);

  res.status(201).json(new ApiResponse(201, enrollment, 'Enrolled successfully'));
});

export const unenroll = catchAsync(async (req, res) => {
  const enrollment = await Enrollment.findOneAndDelete({
    user: req.user._id,
    course: req.params.courseId,
  });
  if (!enrollment) throw new ApiError(404, 'Enrollment not found');

  await Promise.all([
    Progress.findOneAndDelete({ user: req.user._id, course: req.params.courseId }),
    Course.findByIdAndUpdate(req.params.courseId, { $inc: { enrollmentCount: -1 } }),
  ]);

  res.status(200).json(new ApiResponse(200, null, 'Unenrolled successfully'));
});

export const getMyEnrollments = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const filter = { user: req.user._id };
  if (req.query.status) filter.status = req.query.status;

  const [enrollments, total] = await Promise.all([
    Enrollment.find(filter)
      .populate('course', 'title slug thumbnail difficulty category totalLessons totalQuizzes estimatedDuration')
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

export const adminGetEnrollments = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const filter = {};
  if (req.query.courseId) filter.course = req.query.courseId;
  if (req.query.status) filter.status = req.query.status;

  const [enrollments, total] = await Promise.all([
    Enrollment.find(filter)
      .populate('user', 'name email avatar')
      .populate('course', 'title slug')
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
