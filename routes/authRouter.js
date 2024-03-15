import { Router } from 'express';
import authController from '../controllers/authController.js';
import catchAsync from '../utils/catchAsync.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', catchAsync(authController.userRegistration));
router.get('/refresh', catchAsync(authController.userRefreshTokens));
router.post('/login', catchAsync(authController.userLogin));
router.post('/logout', authMiddleware, catchAsync(authController.userLogout));
router.get('/get-me', authMiddleware, catchAsync(authController.getMe));

export default router;
