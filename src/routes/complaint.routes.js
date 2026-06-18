import { Router } from 'express';
import {
  createComplaint, complaintValidators,
  getMyComplaints,
  getMyComplaint,
  getAllComplaints,
  respondToComplaint,
  updateComplaintStatus,
} from '../controllers/complaint.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { protectAdmin } from '../middleware/admin.middleware.js';
import validate from '../middleware/validate.middleware.js';

const router = Router();

// User
router.post('/', protect, complaintValidators, validate, createComplaint);
router.get('/my', protect, getMyComplaints);
router.get('/my/:id', protect, getMyComplaint);

// Admin
router.get('/admin/all', protectAdmin, getAllComplaints);
router.patch('/admin/:id/respond', protectAdmin, respondToComplaint);
router.patch('/admin/:id/status', protectAdmin, updateComplaintStatus);

export default router;
