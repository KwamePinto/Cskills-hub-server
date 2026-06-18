import { body } from 'express-validator';
import Chapter from '../models/Chapter.js';
import Course from '../models/Course.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const chapterValidators = [
  body('title').trim().notEmpty().withMessage('Chapter title is required'),
  body('order').isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
];

export const addChapter = catchAsync(async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) throw new ApiError(404, 'Course not found');

  const chapter = await Chapter.create({
    course: req.params.courseId,
    title: req.body.title,
    description: req.body.description,
    order: req.body.order,
  });

  res.status(201).json(new ApiResponse(201, chapter, 'Chapter added'));
});

export const updateChapter = catchAsync(async (req, res) => {
  const allowed = ['title', 'description', 'order'];
  const updates = {};
  allowed.forEach((f) => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

  const chapter = await Chapter.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!chapter) throw new ApiError(404, 'Chapter not found');
  res.status(200).json(new ApiResponse(200, chapter, 'Chapter updated'));
});

export const deleteChapter = catchAsync(async (req, res) => {
  const chapter = await Chapter.findByIdAndDelete(req.params.id);
  if (!chapter) throw new ApiError(404, 'Chapter not found');
  res.status(200).json(new ApiResponse(200, null, 'Chapter deleted'));
});

export const reorderChapter = catchAsync(async (req, res) => {
  const { order } = req.body;
  if (order === undefined) throw new ApiError(400, 'Order is required');

  const chapter = await Chapter.findByIdAndUpdate(
    req.params.id,
    { order },
    { new: true }
  );
  if (!chapter) throw new ApiError(404, 'Chapter not found');
  res.status(200).json(new ApiResponse(200, chapter, 'Chapter reordered'));
});

export const getChaptersByCourse = catchAsync(async (req, res) => {
  const chapters = await Chapter.find({ course: req.params.courseId }).sort({ order: 1 }).lean();
  res.status(200).json(new ApiResponse(200, chapters, 'Chapters fetched'));
});

export const addBlock = catchAsync(async (req, res) => {
  const { blockType, refId, order } = req.body;
  if (!blockType || !refId || order === undefined) {
    throw new ApiError(400, 'blockType, refId, and order are required');
  }

  const chapter = await Chapter.findByIdAndUpdate(
    req.params.id,
    { $push: { blocks: { blockType, refId, order } } },
    { new: true }
  );
  if (!chapter) throw new ApiError(404, 'Chapter not found');

  // Sort blocks by order
  chapter.blocks.sort((a, b) => a.order - b.order);
  await chapter.save();

  res.status(200).json(new ApiResponse(200, chapter, 'Block added to chapter'));
});

export const removeBlock = catchAsync(async (req, res) => {
  const chapter = await Chapter.findByIdAndUpdate(
    req.params.id,
    { $pull: { blocks: { refId: req.params.refId } } },
    { new: true }
  );
  if (!chapter) throw new ApiError(404, 'Chapter not found');
  res.status(200).json(new ApiResponse(200, chapter, 'Block removed'));
});
