// studentRoutes.ts
import express from 'express';
import { requireRole } from '../middleware/RoleMiddleware';
import { studentDashboard } from '../controllers/studentController';

const router = express.Router();

// Route to access student dashboard
router.get('/dashboard', requireRole('student'), studentDashboard);

export default router;
