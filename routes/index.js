import { Router } from 'express';
import authRouter from './authRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use('/user', authRouter);
router.use('/user', userRouter);

export default router;
