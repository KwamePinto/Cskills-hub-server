import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

const storage = multer.memoryStorage();

const imageUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new ApiError(400, 'Only JPEG, PNG, WEBP and GIF images are allowed'));
  },
});

const videoUpload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: (_req, file, cb) => {
    const allowed = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new ApiError(400, 'Supported video formats: MP4, WebM, MOV, AVI'));
  },
});

const fileUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/pdf',
      'application/zip',
      'text/plain',
      // PowerPoint
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      // Word
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new ApiError(400, 'Allowed file types: PDF, PowerPoint (.ppt/.pptx), Word (.doc/.docx), ZIP, TXT'));
  },
});

const uploadToCloudinary = (buffer, options) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
    stream.end(buffer);
  });

// ── User profile image ────────────────────────────────────────
export const uploadImage = [
  imageUpload.single('image'),
  catchAsync(async (req, res) => {
    if (!req.file) throw new ApiError(400, 'No image file provided');
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'ctcschool/avatars',
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto', width: 400, height: 400, crop: 'fill' }],
    });
    res.status(200).json(
      new ApiResponse(200, { url: result.secure_url, publicId: result.public_id }, 'Image uploaded')
    );
  }),
];

// ── Admin course thumbnail ────────────────────────────────────
export const uploadThumbnail = [
  imageUpload.single('image'),
  catchAsync(async (req, res) => {
    if (!req.file) throw new ApiError(400, 'No image file provided');
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'ctcschool/thumbnails',
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto', width: 1200, height: 675, crop: 'fill' }],
    });
    res.status(200).json(
      new ApiResponse(200, { url: result.secure_url, publicId: result.public_id }, 'Thumbnail uploaded')
    );
  }),
];

// ── Admin lesson image ────────────────────────────────────────
export const uploadImageAdmin = [
  imageUpload.single('image'),
  catchAsync(async (req, res) => {
    if (!req.file) throw new ApiError(400, 'No image file provided');
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'ctcschool/lesson-images',
      resource_type: 'image',
      transformation: [{ quality: 'auto', fetch_format: 'auto', width: 1200, crop: 'limit' }],
    });
    res.status(200).json(
      new ApiResponse(200, { url: result.secure_url, publicId: result.public_id }, 'Image uploaded')
    );
  }),
];

// ── Admin lesson video ────────────────────────────────────────
export const uploadVideo = [
  videoUpload.single('video'),
  catchAsync(async (req, res) => {
    if (!req.file) throw new ApiError(400, 'No video file provided');
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'ctcschool/videos',
      resource_type: 'video',
      eager: [{ quality: 'auto', format: 'mp4' }],  // Cloudinary optimization
    });
    res.status(200).json(
      new ApiResponse(200, {
        url: result.secure_url,
        publicId: result.public_id,
        duration: Math.round(result.duration || 0),
      }, 'Video uploaded')
    );
  }),
];

// ── Admin lesson document ────────────────────────────────────
export const uploadFile = [
  fileUpload.single('file'),
  catchAsync(async (req, res) => {
    if (!req.file) throw new ApiError(400, 'No file provided');
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'ctcschool/documents',
      resource_type: 'raw',
      public_id: req.file.originalname.replace(/\.[^.]+$/, ''), // strip extension
      use_filename: true,
      unique_filename: true,
    });
    res.status(200).json(
      new ApiResponse(200, {
        url: result.secure_url,
        publicId: result.public_id,
        originalName: req.file.originalname,
      }, 'File uploaded')
    );
  }),
];

// ── Delete from Cloudinary ────────────────────────────────────
export const deleteUpload = catchAsync(async (req, res) => {
  const { publicId, resourceType = 'image' } = req.body;
  if (!publicId) throw new ApiError(400, 'publicId is required');
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  res.status(200).json(new ApiResponse(200, null, 'File deleted'));
});
