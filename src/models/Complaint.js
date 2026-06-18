import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['technical', 'content', 'account', 'other'],
      default: 'other',
    },
    status: {
      type: String,
      enum: ['open', 'in-review', 'resolved', 'closed'],
      default: 'open',
    },
    adminResponse: { type: String, default: '' },
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    respondedAt: { type: Date },
  },
  { timestamps: true }
);

complaintSchema.index({ user: 1 });
complaintSchema.index({ status: 1 });
complaintSchema.index({ createdAt: -1 });

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;
