import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    branding: {
      siteName: { type: String, default: 'CTC School' },
      logo: { type: String, default: '' },
      favicon: { type: String, default: '' },
      primaryColor: { type: String, default: '#3B82F6' },
      tagline: { type: String, default: '' },
    },
    theme: {
      colorScheme: { type: String, enum: ['light', 'dark', 'system'], default: 'light' },
      fontFamily: { type: String, default: 'Inter' },
    },
    homepage: {
      heroTitle: { type: String, default: 'Learn Without Limits' },
      heroSubtitle: { type: String, default: '' },
      featuredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    },
    registration: {
      isOpen: { type: Boolean, default: true },
      requireEmailVerification: { type: Boolean, default: false },
    },
    maintenanceMode: {
      isEnabled: { type: Boolean, default: false },
      message: { type: String, default: 'We are currently under maintenance. Please check back soon.' },
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  { timestamps: true }
);

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
