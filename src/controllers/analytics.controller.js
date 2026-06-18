import User from '../models/User.js';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import Progress from '../models/Progress.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const getOverview = catchAsync(async (_req, res) => {
  const [
    totalUsers,
    totalCourses,
    publishedCourses,
    totalEnrollments,
    completedEnrollments,
    activeUsers,
  ] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    Course.countDocuments({ status: 'published' }),
    Enrollment.countDocuments(),
    Enrollment.countDocuments({ status: 'completed' }),
    User.countDocuments({ lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),
  ]);

  const completionRate =
    totalEnrollments > 0 ? Math.round((completedEnrollments / totalEnrollments) * 100) : 0;

  res.status(200).json(
    new ApiResponse(200, {
      totalUsers,
      activeUsers,
      totalCourses,
      publishedCourses,
      totalEnrollments,
      completedEnrollments,
      completionRate,
    }, 'Overview fetched')
  );
});

export const getUserStats = catchAsync(async (_req, res) => {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
  twelveMonthsAgo.setDate(1);
  twelveMonthsAgo.setHours(0, 0, 0, 0);

  const userGrowth = await User.aggregate([
    { $match: { createdAt: { $gte: twelveMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  res.status(200).json(new ApiResponse(200, { userGrowth }, 'User stats fetched'));
});

export const getCourseStats = catchAsync(async (_req, res) => {
  const [topCourses, byDifficulty, byCategory] = await Promise.all([
    Course.find({ status: 'published' })
      .select('title slug enrollmentCount totalLessons totalQuizzes')
      .sort({ enrollmentCount: -1 })
      .limit(10)
      .lean(),

    Course.aggregate([
      { $group: { _id: '$difficulty', count: { $sum: 1 } } },
    ]),

    Course.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]),
  ]);

  res.status(200).json(new ApiResponse(200, { topCourses, byDifficulty, byCategory }, 'Course stats fetched'));
});

export const getEnrollmentStats = catchAsync(async (_req, res) => {
  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
  twelveMonthsAgo.setDate(1);

  const [enrollmentGrowth, byStatus] = await Promise.all([
    Enrollment.aggregate([
      { $match: { enrolledAt: { $gte: twelveMonthsAgo } } },
      {
        $group: {
          _id: { year: { $year: '$enrolledAt' }, month: { $month: '$enrolledAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]),

    Enrollment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
  ]);

  res.status(200).json(new ApiResponse(200, { enrollmentGrowth, byStatus }, 'Enrollment stats fetched'));
});

export const getQuizStats = catchAsync(async (_req, res) => {
  const stats = await Progress.aggregate([
    { $unwind: '$completedQuizzes' },
    {
      $group: {
        _id: null,
        avgScore: { $avg: '$completedQuizzes.percentage' },
        passCount: { $sum: { $cond: ['$completedQuizzes.passed', 1, 0] } },
        totalAttempts: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        avgScore: { $round: ['$avgScore', 1] },
        passRate: {
          $round: [{ $multiply: [{ $divide: ['$passCount', '$totalAttempts'] }, 100] }, 1],
        },
        totalAttempts: 1,
      },
    },
  ]);

  res.status(200).json(new ApiResponse(200, stats[0] || { avgScore: 0, passRate: 0, totalAttempts: 0 }, 'Quiz stats fetched'));
});
