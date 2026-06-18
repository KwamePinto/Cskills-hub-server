import Settings from '../models/Settings.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

const SENSITIVE_FIELDS = { updatedBy: 0 };
const PUBLIC_FIELDS = { branding: 1, theme: 1, homepage: 1, 'registration.isOpen': 1, 'maintenanceMode.isEnabled': 1, 'maintenanceMode.message': 1 };

const getOrCreateSettings = () =>
  Settings.findOneAndUpdate({}, {}, { upsert: true, new: true, setDefaultsOnInsert: true });

export const getPublicSettings = catchAsync(async (_req, res) => {
  const settings = await Settings.findOne({}, PUBLIC_FIELDS)
    .populate('homepage.featuredCourses', 'title slug thumbnail difficulty category estimatedDuration')
    .lean();
  res.status(200).json(new ApiResponse(200, settings || {}, 'Settings fetched'));
});

export const getSettings = catchAsync(async (_req, res) => {
  const settings = await getOrCreateSettings();
  res.status(200).json(new ApiResponse(200, settings, 'Settings fetched'));
});

export const updateSettings = catchAsync(async (req, res) => {
  const settings = await Settings.findOneAndUpdate(
    {},
    { ...req.body, updatedBy: req.admin._id },
    { upsert: true, new: true, runValidators: true }
  );
  res.status(200).json(new ApiResponse(200, settings, 'Settings updated'));
});
