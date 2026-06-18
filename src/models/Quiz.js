import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
  },
  { _id: true }
);

const questionSchema = new mongoose.Schema(
  {
    questionText: { type: String, required: true },
    questionType: {
      type: String,
      enum: ['multiple-choice', 'multiple-answer', 'fill-in-blank'],
      required: true,
    },
    options: [optionSchema],
    correctAnswer: { type: String, default: '' },
    points: { type: Number, default: 1 },
    explanation: { type: String, default: '' },
  },
  { _id: true }
);

const quizSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    questions: [questionSchema],
    totalPoints: { type: Number, default: 0 },
    passingScore: { type: Number, default: 70 },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

quizSchema.index({ course: 1 });
quizSchema.index({ chapter: 1 });

const Quiz = mongoose.model('Quiz', quizSchema);
export default Quiz;
