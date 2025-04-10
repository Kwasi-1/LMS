import { NextFunction, Request, Response } from "express";
import { validateCreateCourse } from "../../utils/lms/validateCreateCourse";
import Quiz, { QuizDataProps } from "../../models/quiz.model";
import { errorHandler } from "../../utils/errorHandlers";
import User from "../../models/user.model";
import { validateCreateAssignment } from "../../utils/lms/teacherValidation";
import Assignments from "../../models/assignment.model";
import Courses from "../../models/course.model";

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

    const newCourse = await Courses.create(data);

    return res.status(200).json({
      success: true,
      message: "Courses Created Successfully",
      // data: newCourses,
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

    await Courses.findByIdAndDelete(id);

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

    await Courses.findByIdAndUpdate(data._id, data);

    return res.status(200).json({
      success: true,
      message: "Course Updated Successfully",
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

    if (!id) return next(errorHandler("Quiz Id required", 400));

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

    if (!data._id) return next(errorHandler("Quiz Id required", 400));

    await Quiz.findByIdAndUpdate(data._id, data);

    return res.status(200).json({
      message: "Quiz updated successfully",
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

export const getAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCourses = await Courses.find({});

    return res.status(200).json({
      message: "Courses Fetched",
      data: allCourses,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllStudents = async (
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

export const getDashboardInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await Courses.find({ instructor: req.userId });
    const pendingGrading = await Assignments.find({
      instructor: req.userId,
      status: "pending",
    });

    const payload = {
      totalCourses: courses.length,
      pendingGrading,
      courses,
    };

    res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: payload,
    });
  } catch (error) {
    next(error);
  }
};

export const createAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateCreateAssignment.validate(req.body);

    if (error) return next(errorHandler(error.details[0].message, 400));

    const { publishImmediately, status, ...rest } = req.body;

    if (publishImmediately === true) {
      await Assignments.create({ status: "published", ...rest });
    } else {
      await Assignments.create(rest);
    }

    res.status(200).json({
      success: true,
      message: "Assignment created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateCreateAssignment.validate(req.body);

    if (error) return next(errorHandler(error.details[0].message, 400));

    const { publishImmediately, status, ...rest } = req.body;

    if (publishImmediately === true) {
      await Assignments.findByIdAndUpdate(req.params.id, {
        status: "published",
        ...rest,
      });
    } else {
      await Assignments.findByIdAndUpdate(req.params.id, rest);
    }

    res.status(200).json({
      success: true,
      message: "Assignment updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAssignments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const assignments = await Assignments.find();

    res.status(200).json({
      success: true,
      message: "Assignments fetched successfully",
      data: assignments,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAssignment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Assignments.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const addPassco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const getAllPassco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};

export const updatePassco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
export const deletePassco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (error) {
    next(error);
  }
};
