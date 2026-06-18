import { body } from 'express-validator';
import Complaint from '../models/Complaint.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { getPaginationParams, paginationMeta } from '../utils/pagination.js';

export const complaintValidators = [
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('category')
    .optional()
    .isIn(['technical', 'content', 'account', 'other'])
    .withMessage('Invalid category'),
];

// ── User ──────────────────────────────────────────────────────
export const createComplaint = catchAsync(async (req, res) => {
  const complaint = await Complaint.create({
    user: req.user._id,
    subject: req.body.subject,
    description: req.body.description,
    category: req.body.category || 'other',
  });
  res.status(201).json(new ApiResponse(201, complaint, 'Complaint submitted'));
});

export const getMyComplaints = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const [complaints, total] = await Promise.all([
    Complaint.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Complaint.countDocuments({ user: req.user._id }),
  ]);
  res.status(200).json(
    new ApiResponse(200, { complaints, pagination: paginationMeta(total, page, limit) }, 'Complaints fetched')
  );
});

export const getMyComplaint = catchAsync(async (req, res) => {
  const complaint = await Complaint.findOne({ _id: req.params.id, user: req.user._id }).lean();
  if (!complaint) throw new ApiError(404, 'Complaint not found');
  res.status(200).json(new ApiResponse(200, complaint, 'Complaint fetched'));
});

// ── Admin ─────────────────────────────────────────────────────
export const getAllComplaints = catchAsync(async (req, res) => {
  const { page, limit, skip } = getPaginationParams(req.query);
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.category) filter.category = req.query.category;

  const [complaints, total] = await Promise.all([
    Complaint.find(filter)
      .populate('user', 'name email avatar')
      .populate('respondedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Complaint.countDocuments(filter),
  ]);

  res.status(200).json(
    new ApiResponse(200, { complaints, pagination: paginationMeta(total, page, limit) }, 'Complaints fetched')
  );
});

export const respondToComplaint = catchAsync(async (req, res) => {
  const { adminResponse } = req.body;
  if (!adminResponse) throw new ApiError(400, 'Response is required');

  const complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    {
      adminResponse,
      respondedBy: req.admin._id,
      respondedAt: new Date(),
      status: 'in-review',
    },
    { new: true }
  );
  if (!complaint) throw new ApiError(404, 'Complaint not found');
  res.status(200).json(new ApiResponse(200, complaint, 'Response sent'));
});

export const updateComplaintStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const valid = ['open', 'in-review', 'resolved', 'closed'];
  if (!valid.includes(status)) throw new ApiError(400, 'Invalid status');

  const complaint = await Complaint.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  if (!complaint) throw new ApiError(404, 'Complaint not found');
  res.status(200).json(new ApiResponse(200, complaint, 'Status updated'));
});
