import { Request, Response, NextFunction } from 'express';
import { IAdminDocument } from '../interfaces/admin.interface';

import ErrorResponse from "../utils/errorResponse";

export function googleCallback(req: Request, res: Response) {
  res.redirect('/v1/auth/success')
}

export function success(req: Request, res: Response, next: NextFunction) {
  const user = req.user as IAdminDocument;

  if (!user) return next(new ErrorResponse('No user data passed into the request body', 400));

  res.status(200).json({
    id: user._id,
    name: user.displayName,
    email: user.email,
    avatar: user.avatar,
    isSuperAdmin: user.isSuperAdmin
  });
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err: any): void => {
    if (err) {
      return next(new ErrorResponse(err.message, 500));
    }

    res.redirect("/v1/auth/login");
  });
};
