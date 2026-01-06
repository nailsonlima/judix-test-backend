import express from 'express';
import healthRoutes from './healthRoutes.js';

const router = express.Router();

router.use('/', healthRoutes);

export default router;
