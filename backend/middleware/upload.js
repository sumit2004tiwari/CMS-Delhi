import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// For __dirname support in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sanitize file name function
function sanitizeFileName(filename) {
  return filename
    .replace(/\s+/g, '_')       // Replace spaces with _
    .replace(/[^a-zA-Z0-9_\-\.]/g, '') // Remove special characters
    .toLowerCase();
}

// ---------- IMAGE STORAGE ----------
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../uploads/images/');
    fs.mkdirSync(dir, { recursive: true }); // ✅ Auto-create
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const safeName = sanitizeFileName(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(safeName));
  },
});

// ---------- VIDEO STORAGE ----------
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../uploads/videos/');
    fs.mkdirSync(dir, { recursive: true }); // ✅ Auto-create
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const safeName = sanitizeFileName(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(safeName));
  },
});

// File type checker
function checkFileType(file, cb, allowedTypes) {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only ' + allowedTypes.join(', ') + ' files are allowed!'));
  }
}

// Image upload middleware
export const uploadImage = multer({
  storage: imageStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb, ['image/jpeg', 'image/png', 'image/webp']);
  },
}).single('image');

// Video upload middleware
export const uploadVideo = multer({
  storage: videoStorage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb, ['video/mp4']);
  },
}).single('video');
