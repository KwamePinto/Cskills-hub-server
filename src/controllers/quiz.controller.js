import { body } from 'express-validator';
import Quiz from '../models/Quiz.js';
import Chapter from '../models/Chapter.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import Progress from '../models/Progress.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const quizValidators = [
  body('title').trim().notEmpty().withMessage('Quiz title is required'),
  body('order').isInt({ min: 0 }).withMessage('Order must be a non-negative integer'),
  body('questions').isArray({ min: 1 }).withMessage('At least one question is required'),
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

const sanitizeQuiz = (quiz) => ({
  ...quiz,
  questions: quiz.questions.map((q) => ({
    _id: q._id,
    questionText: q.questionText,
    questionType: q.questionType,
    points: q.points,
    explanation: undefined,
    options: q.questionType !== 'fill-in-blank'
      ? q.options.map(({ _id, text }) => ({ _id, text }))
      : [],
  })),
});

// ── Admin ─────────────────────────────────────────────────────
export const createQuiz = catchAsync(async (req, res) => {
  const chapter = await Chapter.findById(req.params.chapterId).lean();
  if (!chapter) throw new ApiError(404, 'Chapter not found');

  const totalPoints = (req.body.questions || []).reduce((sum, q) => sum + (q.points || 1), 0);

  const quiz = await Quiz.create({
    ...req.body,
    course: chapter.course,
    chapter: chapter._id,
    totalPoints,
  });

  await Promise.all([
    Course.findByIdAndUpdate(chapter.course, { $inc: { totalQuizzes: 1 } }),
    Chapter.findByIdAndUpdate(chapter._id, {
      $push: { blocks: { blockType: 'quiz', refId: quiz._id, order: quiz.order } },
    }),
  ]);

  res.status(201).json(new ApiResponse(201, quiz, 'Quiz created'));
});

export const updateQuiz = catchAsync(async (req, res) => {
  if (req.body.questions) {
    req.body.totalPoints = req.body.questions.reduce((sum, q) => sum + (q.points || 1), 0);
  }
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!quiz) throw new ApiError(404, 'Quiz not found');
  res.status(200).json(new ApiResponse(200, quiz, 'Quiz updated'));
});

export const deleteQuiz = catchAsync(async (req, res) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);
  if (!quiz) throw new ApiError(404, 'Quiz not found');

  await Promise.all([
    Course.findByIdAndUpdate(quiz.course, { $inc: { totalQuizzes: -1 } }),
    Chapter.findByIdAndUpdate(quiz.chapter, { $pull: { blocks: { refId: quiz._id } } }),
  ]);

  res.status(200).json(new ApiResponse(200, null, 'Quiz deleted'));
});

// ── Admin (no enrollment check) ───────────────────────────────
export const getQuizAdmin = catchAsync(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).lean();
  if (!quiz) throw new ApiError(404, 'Quiz not found');
  res.status(200).json(new ApiResponse(200, quiz, 'Quiz fetched'));
});

// ── User (enrolled) ───────────────────────────────────────────
export const getQuiz = catchAsync(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).lean();
  if (!quiz) throw new ApiError(404, 'Quiz not found');

  const enrollment = await Enrollment.findOne({
    user: req.user._id,
    course: quiz.course,
    status: { $in: ['active', 'completed'] },
  }).lean();
  if (!enrollment) throw new ApiError(403, 'You are not enrolled in this course');

  res.status(200).json(new ApiResponse(200, sanitizeQuiz(quiz), 'Quiz fetched'));
});

export const submitQuiz = catchAsync(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).lean();
  if (!quiz) throw new ApiError(404, 'Quiz not found');

  const enrollment = await Enrollment.findOne({
    user: req.user._id,
    course: quiz.course,
    status: 'active',
  }).lean();
  if (!enrollment) throw new ApiError(403, 'Not enrolled or course already completed');

  const alreadyDone = await Progress.findOne({
    user: req.user._id,
    course: quiz.course,
    'completedQuizzes.quiz': quiz._id,
  }).lean();
  if (alreadyDone) throw new ApiError(400, 'You have already completed this quiz');

  const { answers } = req.body;
  if (!Array.isArray(answers)) throw new ApiError(400, 'Answers must be an array');

  let score = 0;
  const gradedAnswers = quiz.questions.map((question, idx) => {
    const userAnswer = answers[idx]?.answer;
    let isCorrect = false;

    if (question.questionType === 'multiple-choice') {
      const correctOption = question.options.find((o) => o.isCorrect);
      isCorrect = correctOption && String(correctOption._id) === String(userAnswer);

    } else if (question.questionType === 'multiple-answer') {
      const correctIds = question.options.filter((o) => o.isCorrect).map((o) => String(o._id));
      const userIds = Array.isArray(userAnswer) ? userAnswer.map(String) : [];
      isCorrect =
        correctIds.length === userIds.length &&
        correctIds.every((id) => userIds.includes(id));

    } else if (question.questionType === 'fill-in-blank') {
      isCorrect =
        String(userAnswer || '').trim().toLowerCase() ===
        String(question.correctAnswer || '').trim().toLowerCase();
    }

    if (isCorrect) score += question.points || 1;

    return {
      questionId: question._id,
      userAnswer,
      isCorrect,
      explanation: question.explanation,
    };
  });

  const percentage = quiz.totalPoints > 0 ? Math.round((score / quiz.totalPoints) * 100) : 0;
  const passed = percentage >= quiz.passingScore;

  await Progress.findOneAndUpdate(
    { user: req.user._id, course: quiz.course },
    {
      $push: {
        completedQuizzes: {
          quiz: quiz._id,
          score,
          totalPoints: quiz.totalPoints,
          percentage,
          passed,
          answers: gradedAnswers,
          completedAt: new Date(),
        },
      },
    }
  );

  await recalcProgress(req.user._id, quiz.course);

  res.status(200).json(
    new ApiResponse(200, { score, totalPoints: quiz.totalPoints, percentage, passed, gradedAnswers }, 'Quiz submitted')
  );
});
