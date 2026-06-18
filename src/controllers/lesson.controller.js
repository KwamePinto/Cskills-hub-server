import { body } from 'express-validator';
import Lesson from '../models/Lesson.js';
import Chapter from '../models/Chapter.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import Progress from '../models/Progress.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const lessonValidators = [
  body('title').trim().notEmpty().withMessage('Lesson title is required'),
  body('order').isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
];

const recalcProgress = async (userId, courseId) => {
  const [course, progress] = await Promise.all([
    Course.findById(courseId).lean(),
    Progress.findOne({ user: userId, course: courseId }),
  ]);
  if (!progress || !course) return;

  const totalItems = course.totalLessons + course.totalQuizzes;
  const completedItems = progress.completedLessons.length + progress.completedQuizzes.length;
  progress.completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  progress.totalItems = totalItems;
  await progress.save();

  if (progress.completionPercentage === 100) {
    await Enrollment.findOneAndUpdate(
      { user: userId, course: courseId },
      { status: 'completed', completedAt: new Date() }
    );
  }
};

// ── Admin ─────────────────────────────────────────────────────
export const createLesson = catchAsync(async (req, res) => {
  const chapter = await Chapter.findById(req.params.chapterId).lean();
  if (!chapter) throw new ApiError(404, 'Chapter not found');

  const lesson = await Lesson.create({
    ...req.body,
    course: chapter.course,
    chapter: chapter._id,
  });

  // Update denormalized count and add block to chapter
  await Promise.all([
    Course.findByIdAndUpdate(chapter.course, { $inc: { totalLessons: 1 } }),
    Chapter.findByIdAndUpdate(chapter._id, {
      $push: { blocks: { blockType: 'lesson', refId: lesson._id, order: lesson.order } },
    }),
  ]);

  res.status(201).json(new ApiResponse(201, lesson, 'Lesson created'));
});

export const updateLesson = catchAsync(async (req, res) => {
  const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!lesson) throw new ApiError(404, 'Lesson not found');
  res.status(200).json(new ApiResponse(200, lesson, 'Lesson updated'));
});

export const deleteLesson = catchAsync(async (req, res) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);
  if (!lesson) throw new ApiError(404, 'Lesson not found');

  await Promise.all([
    Course.findByIdAndUpdate(lesson.course, { $inc: { totalLessons: -1 } }),
    Chapter.findByIdAndUpdate(lesson.chapter, {
      $pull: { blocks: { refId: lesson._id } },
    }),
  ]);

  res.status(200).json(new ApiResponse(200, null, 'Lesson deleted'));
});

// ── Admin (no enrollment check) ───────────────────────────────
export const getLessonAdmin = catchAsync(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id).lean();
  if (!lesson) throw new ApiError(404, 'Lesson not found');
  res.status(200).json(new ApiResponse(200, lesson, 'Lesson fetched'));
});

// ── User (enrolled) ───────────────────────────────────────────
export const getLesson = catchAsync(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id).lean();
  if (!lesson) throw new ApiError(404, 'Lesson not found');

  const enrollment = await Enrollment.findOne({
    user: req.user._id,
    course: lesson.course,
    status: { $in: ['active', 'completed'] },
  }).lean();
  if (!enrollment) throw new ApiError(403, 'You are not enrolled in this course');

  // Update last accessed
  await Progress.findOneAndUpdate(
    { user: req.user._id, course: lesson.course },
    { lastAccessedLesson: lesson._id, lastAccessedAt: new Date() }
  );

  res.status(200).json(new ApiResponse(200, lesson, 'Lesson fetched'));
});

export const completeLesson = catchAsync(async (req, res) => {
  const lesson = await Lesson.findById(req.params.id).lean();
  if (!lesson) throw new ApiError(404, 'Lesson not found');

  const enrollment = await Enrollment.findOne({
    user: req.user._id,
    course: lesson.course,
    status: 'active',
  }).lean();
  if (!enrollment) throw new ApiError(403, 'Not enrolled or course already completed');

  // Add to completedLessons only if not already there
  await Progress.findOneAndUpdate(
    { user: req.user._id, course: lesson.course },
    {
      $addToSet: { completedLessons: lesson._id },
      lastAccessedLesson: lesson._id,
      lastAccessedAt: new Date(),
    }
  );

  await recalcProgress(req.user._id, lesson.course);

  res.status(200).json(new ApiResponse(200, null, 'Lesson marked as complete'));
});
