import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    status: { type: String, enum: ['active', 'completed', 'dropped'], default: 'active' },
    enrolledAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

enrollmentSchema.index({ user: 1 });
enrollmentSchema.index({ course: 1 });
enrollmentSchema.index({ user: 1, course: 1 }, { unique: true });
enrollmentSchema.index({ status: 1 });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;
