import { NextFunction, Request, Response } from "express";
import {
  dummyCourseData,
  validateCreateCourse,
} from "../../utils/lms/validateCreateCourse";
import Course from "../../models/course.model";
import Quiz, { QuizDataProps } from "../../models/quiz.model";
import { errorHandler } from "../../utils/errorHandlers";
import User from "../../models/user.model";
import UsersQuizData from "../../models/usersQuizData.model";
import { validateCreateNewUser } from "../../utils/dataValidation";
import bcrypt from "bcrypt";

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

export const CreateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const validationResult = validateCreateCourse(data);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }

    const newCourse = await Course.create(data);

    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      // data: newCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    await Course.findByIdAndDelete(id);

    return res.status(200).json({ message: "Course Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const validationResult = validateCreateCourse(data);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }

    const updatedCourse = await Course.findByIdAndUpdate(data._id, data);

    return res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
      // data: newCourse,
    });
  } catch (error) {
    next(error);
  }
};

export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    // const courseId = req.params.courseId;

    await Quiz.create(data);

    return res.status(200).json({
      message: "Quiz Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) return next(errorHandler("Course Id required", 400));

    await Quiz.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: QuizDataProps = req.body;

    if (!data._id) return next(errorHandler("Course Id required", 400));

    await Quiz.findByIdAndUpdate(data._id, data);

    return res.status(200).json({
      message: "Quiz updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCourses = await Course.find({});

    return res.status(200).json({
      message: "Courses Fetched",
      data: allCourses,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const quizzes = await Quiz.find({}).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Quizzes Fetched",
      data: quizzes,
    });
  } catch (error) {
    next(error);
  }
};

export const fetchDashboardInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.find({ role: { $ne: "General" } });

    const payload = {
      totalUsers: await User.countDocuments(),
      totalCourses: await Course.countDocuments(),
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
