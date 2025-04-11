import { NextFunction, Request, Response } from "express";
import Course from "../../models/course.model";

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCourses = await Course.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Courses Fetched",
      data: allCourses,
    });
  } catch (error) {
    next(error);
  }
};
