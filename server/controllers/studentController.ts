import { Request, Response } from 'express';

export const studentDashboard = (req: Request, res: Response): void => {
  res.render('student/dashboard'); // Render student dashboard view
};