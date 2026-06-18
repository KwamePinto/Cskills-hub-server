import mongoose from 'mongoose';

const mediaItemSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['video-upload', 'video-embed', 'image', 'document'],
      required: true,
    },
    url:       { type: String, required: true },
    publicId:  { type: String, default: '' },  // Cloudinary public_id
    caption:   { type: String, default: '' },
    fileName:  { type: String, default: '' },  // original filename for docs/videos
    mimeType:  { type: String, default: '' },
    duration:  { type: Number, default: 0 },   // seconds (video only)
  },
  { _id: true }
);

const lessonSchema = new mongoose.Schema(
  {
    course:            { type: mongoose.Schema.Types.ObjectId, ref: 'Course',  required: true },
    chapter:           { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter', required: true },
    title:             { type: String, required: true, trim: true },
    content:           { type: String, default: '' },
    media:             [mediaItemSchema],
    estimatedDuration: { type: Number, default: 0 },
    order:             { type: Number, required: true },
  },
  { timestamps: true }
);

lessonSchema.index({ course: 1 });
lessonSchema.index({ chapter: 1, order: 1 });

const Lesson = mongoose.model('Lesson', lessonSchema);
export default Lesson;
