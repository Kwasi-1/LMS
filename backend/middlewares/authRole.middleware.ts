import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { errorHandler } from "../utils/errorHandlers";
export const authRole = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.userId);

      if (!user || !roles.includes(user.role)) {
        return next(errorHandler("Unauthorized Access", 403));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};