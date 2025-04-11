import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandlers";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return next(errorHandler("Unauthorized", 401));
    }

    const accessToken = authHeader.split(" ")[1];
    const decoded = verify(accessToken, process.env.ACCESS_TOKEN || "");

    if (!decoded) {
      return next(errorHandler("Unauthorized", 401));
    }

    req.userId = (decoded as any).userId;
    next();
  } catch (error) {
    return next(errorHandler("Unauthorized", 401));
  }
};
