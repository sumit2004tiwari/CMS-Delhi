import express from 'express';
const router = express.Router();
import { authAdmin , registerAdmin} from '../controllers/adminController.js';


router.post('/login', authAdmin);
// router.post('/register', registerAdmin);
// router.post('/register', registerAdmin); 

export default router;