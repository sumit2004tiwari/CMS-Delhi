import Video from '../models/Video.js';
import asyncHandler from 'express-async-handler';
import path from 'path';

// @desc    Get background video
// @route   GET /api/video
// @access  Public
export const getVideo = asyncHandler(async (req, res) => {
  const video = await Video.findOne().sort({ createdAt: -1 });
  res.json(video);
});

// @desc    Upload/set background video
// @route   POST /api/video
// @access  Private/Admin
export const setVideo = asyncHandler(async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`; // e.g., http://localhost:5000
  let video;

  if (req.file) {
    // ✅ Store absolute URL directly
    const videoPath = `/uploads/videos/${path.basename(req.file.path)}`;
    video = await Video.create({
      url: `${baseUrl}${videoPath}`,
      isLocal: true,
    });
  } else if (req.body.url) {
    // External URL
    video = await Video.create({
      url: req.body.url,
      isLocal: false,
    });
  } else {
    res.status(400);
    throw new Error('Please provide either a video file or URL');
  }

  res.status(201).json(video);
});
