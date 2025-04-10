import { NextFunction, Request, Response } from "express";

import Quiz from "../../models/quiz.model";
import { errorHandler } from "../../utils/errorHandlers";
import UsersQuizData from "../../models/usersQuizData.model";
import { validateUserType } from "../../utils/dataValidation";
import bcrypt from "bcrypt";
import Courses from "../../models/course.model";
import Teachers from "../../models/teacher.model";
import Students from "../../models/student.model";
import Parents from "../../models/parent.model";
import Admins from "../../models/admin.model";
import Assignments from "../../models/assignment.model";

export const fetchDashboardInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allStudents = await Students.find();

    const payload = {
      totalStudents: allStudents.length,
      recentStudents: allStudents,
      totalTeachers: await Teachers.countDocuments(),
      totalQuizzes: await Quiz.countDocuments(),
      totalAssignments: await Assignments.countDocuments(),
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

    switch (req.params.role) {
      case "student":
        await Students.findByIdAndDelete(id);
        break;

      case "admin":
        await Admins.findByIdAndDelete(id);
        break;

      case "parent":
        await Parents.findByIdAndDelete(id);
        break;

      case "teacher":
        await Teachers.findByIdAndDelete(id);
        break;

      default:
        return next(errorHandler("Invalid Role", 400));
    }

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
    const admins = await Admins.find({ _id: { $ne: req.userId } }).sort({
      updatedAt: -1,
    });

    const students = await Students.find();
    const parents = await Parents.find();
    const teachers = await Teachers.find();

    const payload: any = [];

    students.forEach((student) => payload.push(student));
    admins.forEach((student) => payload.push(student));
    teachers.forEach((student) => payload.push(student));
    parents.forEach((student) => payload.push(student));

    // console.log(payload);

    res.status(200).json({ success: true, data: payload });
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
    const { password, email, role, ...otherCredentials } = req.body;

    if (!role) return next(errorHandler("Role required", 400));

    const { error } = validateUserType(role).validate(req.body);

    if (error) return next(errorHandler(error.details[0].message, 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    switch (role) {
      case "student":
        await Students.create({
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      case "admin":
        await Admins.create({
          email: email.toLowerCase(),
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      case "parent":
        await Parents.create({
          email: email.toLowerCase(),
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      case "teacher":
        await Teachers.create({
          email: email.toLowerCase(),
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      default:
        return next(errorHandler("Invalid Role", 400));
    }

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
    const { password, email, role, ...otherCredentials } = req.body;
    const { error } = validateUserType(role).validate(req.body);

    if (error) return next(errorHandler(error.details[0].message, 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    switch (role) {
      case "student":
        await Students.findByIdAndUpdate(req.params.id, {
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      case "admin":
        await Admins.findByIdAndUpdate(req.params.id, {
          email: email.toLowerCase(),
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      case "parent":
        await Parents.findByIdAndUpdate(req.params.id, {
          email: email.toLowerCase(),
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      case "teacher":
        await Teachers.findByIdAndUpdate(req.params.id, {
          email: email.toLowerCase(),
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      default:
        return next(errorHandler("Invalid Role", 400));
    }

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
    const user = await Students.findById(req.params.id);

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
