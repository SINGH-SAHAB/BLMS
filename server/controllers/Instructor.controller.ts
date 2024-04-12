import { Request, Response } from 'express';

export const instructorDashboard = (req: Request, res: Response): void => {
  res.render('instructor/dashboard'); // Render instructor dashboard view
};