import { NextFunction, Request, Response } from "express";

import Quiz from "../../models/quiz.model";
import { errorHandler } from "../../utils/errorHandlers";
import User from "../../models/user.model";
import UsersQuizData from "../../models/usersQuizData.model";
import { validateCreateNewUser } from "../../utils/dataValidation";
import bcrypt from "bcrypt";
import Courses from "../../models/course.model";

export const fetchDashboardInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.find({ role: { $ne: "General" } });

    const payload = {
      totalUsers: await User.countDocuments(),
      totalCourses: await Courses.countDocuments(),
      totalQuizzes: await Quiz.countDocuments(),
      recentUsers: allUsers,
    };

    return res.status(200).json({
      data: payload,
      message: "Dashboard Info Fetched",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await User.findByIdAndDelete(id);

    await UsersQuizData.deleteMany({ userId: id });

    return res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).sort({
      updatedAt: -1,
    });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    return next(error);
  }
};

export const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateCreateNewUser.validate(req.body);

    if (error) return next(errorHandler(error.details[0].message, 400));

    const { password, email, ...rest } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      password: hashedPassword,
      email: email.toLowerCase(),
      ...rest,
    });

    res.status(200).json({
      success: true,
      message: "User added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserCredentials = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateCreateNewUser.validate(req.body);

    if (error) return next(errorHandler(error.details[0].message, 400));

    const { password, email, ...rest } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(req.params.id, {
      password: hashedPassword,
      email: email.toLowerCase(),
      ...rest,
    });

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const fetchUserData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler("User not found", 400));

    const { password, ...rest } = user._doc;

    return res.status(200).json({
      data: {
        success: true,
        data: rest,
      },
    });
  } catch (error) {
    next(error);
  }
};
