import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandlers";
import Students from "../models/student.model";
import Admins from "../models/admin.model";
import Parents from "../models/parent.model";
import Teachers from "../models/teacher.model";
export const authRole = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let user;
      const role = roles[0];
      switch (role) {
        case "student":
          user = await Students.findOne({ id: req.body.id });
          break;

        case "admin":
          user = await Admins.findOne({
            email: req.body.email.toLowerCase(),
          });
          break;

        case "parent":
          user = await Parents.findOne({
            email: req.body.email.toLowerCase(),
          });
          break;

        case "teacher":
          user = await Teachers.findOne({
            email: req.body.email.toLowerCase(),
          });
          break;

        default:
          return next(errorHandler("Invalid Role", 400));
      }

      if (!user || !roles.includes(user.role)) {
        return next(errorHandler("Unauthorized Access", 403));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
