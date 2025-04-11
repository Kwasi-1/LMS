import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandlers";
import { verify } from "jsonwebtoken";

export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies.ACCESS_TOKEN;

    if (!accessToken) {
      return next(errorHandler("Unauthorized", 401));
    }

    const decoded = verify(
      accessToken,
      (process.env.ACCESS_TOKEN as any) || ""
    );

    if (!decoded) {
      return next(errorHandler("Unauthorized", 401));
    }

    req.userId = (decoded as any).userId;
    next();
  } catch (error) {
    return next(errorHandler("Unauthorized", 401));
  }
};
