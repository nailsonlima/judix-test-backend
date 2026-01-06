import express from 'express';
import healthRoutes from './healthRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/', healthRoutes);

export default router;
