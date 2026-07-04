import { Router } from "express";
import { register, login, getMe, googleAuth } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/google', googleAuth);

export default router;