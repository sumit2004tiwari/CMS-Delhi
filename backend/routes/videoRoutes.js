import express from 'express';
const router = express.Router();
import { protect } from '../middleware/authMiddleware.js';
import { uploadVideo } from '../middleware/upload.js';
import { getVideo, setVideo } from '../controllers/videoController.js';

router.route('/').get(getVideo).post( uploadVideo, setVideo);

export default router;