import { Request, Response, NextFunction } from 'express';

// Middleware to check if the user has the required role
export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Assuming you have user information stored in req.user after authentication
    if (req.user && req.user.role === role) {
      // User has the required role, proceed to the next middleware or route handler
      next();
    } else {
      // User does not have the required role, respond with an error
      return res.status(403).json({ error: 'Unauthorized' });
    }
  };
};
