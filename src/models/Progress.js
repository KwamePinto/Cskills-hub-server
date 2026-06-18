import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    percentage: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    answers: [mongoose.Schema.Types.Mixed],
    completedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const progressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
    completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    completedQuizzes: [quizResultSchema],
    lastAccessedLesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    lastAccessedAt: { type: Date },
    completionPercentage: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
  },
  { timestamps: true }
);

progressSchema.index({ user: 1, course: 1 }, { unique: true });
progressSchema.index({ user: 1 });

const Progress = mongoose.model('Progress', progressSchema);
export default Progress;
