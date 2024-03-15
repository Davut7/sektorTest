import { Router } from 'express';
import catchAsync from '../utils/catchAsync.js';
import userController from '../controllers/userController.js';
import upload from '../services/multer.js';

const router = Router();

router.get('/profiles', catchAsync(userController.getUsers));
router.put(
	'/profile/:id',
	upload.single('image'),
	catchAsync(userController.updateUser)
);
router.get('/profile/:id', catchAsync(userController.getOneUser));

export default router;
