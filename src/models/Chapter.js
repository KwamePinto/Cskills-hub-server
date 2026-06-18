import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema(
  {
    blockType: { type: String, enum: ['lesson', 'quiz'], required: true },
    refId: { type: mongoose.Schema.Types.ObjectId, required: true },
    order: { type: Number, required: true },
  },
  { _id: false }
);

const chapterSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    order: { type: Number, required: true },
    blocks: [blockSchema],
  },
  { timestamps: true }
);

chapterSchema.index({ course: 1, order: 1 });

const Chapter = mongoose.model('Chapter', chapterSchema);
export default Chapter;
