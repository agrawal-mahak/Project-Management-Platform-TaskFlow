import { Router } from "express";
import { register, login, getMe, googleAuth, getUsers, updateUserRole } from '../controllers/authController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/google', googleAuth);
router.get('/users', protect, getUsers);
router.put('/users/:id/role', protect, authorizeRoles('admin'), updateUserRole);

export default router;