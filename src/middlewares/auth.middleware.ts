import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service';
import ErrorResponse from '../utils/errorResponse';
import { IAdminDocument } from '../interfaces/admin.interface';

const adminService = new AdminService();

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  // Implement the middleware logic to check if the user is authenticate
  if (req.isAuthenticated()) {
    return next();
  }
  // User is not logged in, redirect to the login page
  res.redirect('/v1/auth/login');
}

export const authenticateSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.user as IAdminDocument;

    const admin = await adminService.getAdminByEmail(email);

    if (!admin || !admin.isSuperAdmin) {
      return next(new ErrorResponse('Not authorized, Only super admin are allowed', 403))
    }
    next();
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
}