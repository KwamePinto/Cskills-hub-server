import { body } from 'express-validator';
import Course from '../models/Course.js';
import Chapter from '../models/Chapter.js';
import Enrollment from '../models/Enrollment.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { getPaginationParams, paginationMeta } from '../utils/pagination.js';

export const courseValidators = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('difficulty')
    .isIn(['beginner', 'intermediate', 'advanced'])
    .withMessage('Invalid difficulty'),
  body('category').trim().notEmpty().withMessage('Category is required'),
];

// ── Public ────────────────────────────────────────────────────
export const getCourses = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const { search, category, difficulty, tags } = req.query;

  const filter = { status: 'published' };
  if (search) filter.$text = { $search: search };
  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;
  if (tags) filter.tags = { $in: tags.split(',').map((t) => t.trim().toLowerCase()) };

  const sortBy = search ? { score: { $meta: 'textScore' } } : { enrollmentCount: -1, createdAt: -1 };

  const [courses, total] = await Promise.all([
    Course.find(filter, search ? { score: { $meta: 'textScore' } } : {})
      .select('title slug thumbnail difficulty category tags estimatedDuration totalLessons totalQuizzes enrollmentCount createdAt')
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .lean(),
    Course.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, { courses, pagination: paginationMeta(total, page, limit) }, 'Courses fetched')
  );
});

export const getCourse = catchAsync(async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug, status: 'published' })
    .populate('createdBy', 'name')
    .lean();
  if (!course) throw new ApiError(404, 'Course not found');

  const chapters = await Chapter.find({ course: course._id }).sort({ order: 1 }).lean();

  res.status(200).json(new ApiResponse(200, { course, chapters }, 'Course fetched'));
});

// ── Admin ─────────────────────────────────────────────────────
export const getAdminCourses = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const { status, search } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (search) filter.$text = { $search: search };

  const [courses, total] = await Promise.all([
    Course.find(filter)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Course.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, { courses, pagination: paginationMeta(total, page, limit) }, 'Courses fetched')
  );
});

export const createCourse = catchAsync(async (req, res) => {
  const course = await Course.create({ ...req.body, createdBy: req.admin._id });
  res.status(201).json(new ApiResponse(201, course, 'Course created'));
});

export const updateCourse = catchAsync(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json(new ApiResponse(200, course, 'Course updated'));
});

export const deleteCourse = catchAsync(async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) throw new ApiError(404, 'Course not found');
  await Chapter.deleteMany({ course: req.params.id });
  res.status(200).json(new ApiResponse(200, null, 'Course deleted'));
});

export const publishCourse = catchAsync(async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { status: 'published' },
    { new: true }
  );
  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json(new ApiResponse(200, course, 'Course published'));
});

export const draftCourse = catchAsync(async (req, res) => {
  const course = await Course.findByIdAndUpdate(
    req.params.id,
    { status: 'draft' },
    { new: true }
  );
  if (!course) throw new ApiError(404, 'Course not found');
  res.status(200).json(new ApiResponse(200, course, 'Course moved to draft'));
});

export const getEnrolledCourseDetail = catchAsync(async (req, res) => {
  const enrollment = await Enrollment.findOne({
    user: req.user._id,
    course: req.params.id,
    status: { $in: ['active', 'completed'] },
  }).lean();
  if (!enrollment) throw new ApiError(403, 'You are not enrolled in this course');

  const [course, chapters] = await Promise.all([
    Course.findById(req.params.id).lean(),
    Chapter.find({ course: req.params.id }).sort({ order: 1 }).lean(),
  ]);
  if (!course) throw new ApiError(404, 'Course not found');

  res.status(200).json(new ApiResponse(200, { course, chapters }, 'Course detail fetched'));
});
