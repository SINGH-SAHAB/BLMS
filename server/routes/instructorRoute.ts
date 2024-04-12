// instructorRoutes.ts
import express from 'express';
import { requireRole } from '../middleware/RoleMiddleware';
import { instructorDashboard } from '../controllers/Instructor.controller';

const router = express.Router();

// Route to access instructor dashboard
router.get('/dashboard', requireRole('instructor'), instructorDashboard);

export default router;
