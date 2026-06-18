import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, lowercase: true },
    description: { type: String, required: true },
    thumbnail: { type: String, default: '' },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    tags: [{ type: String, lowercase: true, trim: true }],
    category: { type: String, required: true, trim: true },
    estimatedDuration: { type: Number, default: 0 },
    overview: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
    totalLessons: { type: Number, default: 0 },
    totalQuizzes: { type: Number, default: 0 },
    enrollmentCount: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  },
  { timestamps: true }
);

courseSchema.index({ title: 'text', description: 'text', tags: 'text' });
courseSchema.index({ status: 1 });
courseSchema.index({ category: 1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ enrollmentCount: -1 });
courseSchema.index({ createdAt: -1 });

courseSchema.pre('save', async function () {
  if (!this.isModified('title')) return;
  const base = this.title
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  let slug = base;
  let count = 1;
  while (await mongoose.model('Course').findOne({ slug, _id: { $ne: this._id } })) {
    slug = `${base}-${count++}`;
  }
  this.slug = slug;
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
