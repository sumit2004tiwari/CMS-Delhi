import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { uploadImage } from '../middleware/upload.js';
import {
  getHeroSections,
  createHeroSection,
  updateHeroSection,
  deleteHeroSection
} from '../controllers/heroController.js';

const router = express.Router();

router
  .route('/')
  .get(getHeroSections)
  .post(protect, uploadImage, createHeroSection);

router
  .route('/:id')
  .put(protect, uploadImage, updateHeroSection)
  .delete(protect, deleteHeroSection);

export default router;
