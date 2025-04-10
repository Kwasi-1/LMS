import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../utils/errorHandlers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateUserType } from "../utils/dataValidation";
import Students from "../models/student.model";
import Admins from "../models/admin.model";
import Parents from "../models/parent.model";
import Teachers from "../models/teacher.model";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role, password, email, ...otherCredentials } = req.body;

    const { error } = validateUserType(role).validate(req.body);

    if (error) return next(errorHandler(error.details[0].message, 400));


    let isUser;
    switch (role) {
      case "student":
        isUser = await Students.findOne({ id: req.body.id });
        break;

      case "admin":
        isUser = await Admins.findOne({ email: req.body.email.toLowerCase() });
        break;

      case "parent":
        isUser = await Parents.findOne({ email: req.body.email.toLowerCase() });
        break;

      case "teacher":
        isUser = await Teachers.findOne({
          email: req.body.email.toLowerCase(),
        });
        break;

      default:
        return next(errorHandler("Invalid Role", 400));
    }

    if (isUser) return next(errorHandler("User already exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    switch (role) {
      case "student":
        newUser = await Students.create({
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      case "admin":
        newUser = await Admins.create({
          email: email.toLowerCase(),
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      case "parent":
        newUser = await Parents.create({
          email: email.toLowerCase(),
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      case "teacher":
        newUser = await Teachers.create({
          email: email.toLowerCase(),
          password: hashedPassword,
          ...otherCredentials,
        });
        break;

      default:
        return next(errorHandler("Invalid Role", 400));
    }

    const { password: savedPassword, ...rest } = (newUser as any)._doc;

    const tokenData = {
      userId: newUser._id,
    };

    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN as any, {
      expiresIn: "48h",
    });

    res
      .status(200)
      .cookie("ACCESS_TOKEN", accessToken, {
        sameSite: "none",
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        message: "Account Created successfully",
        data: rest,
      });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password)
      return next(errorHandler("Fill in all credentials", 400));

    let user;
    switch (role) {
      case "student":
        user = await Students.findOne({ id: req.body.id });
        break;

      case "admin":
        user = await Admins.findOne({ email: req.body.email.toLowerCase() });
        break;

      case "parent":
        user = await Parents.findOne({ email: req.body.email.toLowerCase() });
        break;

      case "teacher":
        user = await Teachers.findOne({
          email: req.body.email.toLowerCase(),
        });
        break;

      default:
        return next(errorHandler("Invalid Role", 400));
    }

    if (!user) return next(errorHandler("Invalid Credentials", 400));

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) return next(errorHandler("Invalid Credentials", 400));

    const tokenData = {
      userId: user._id,
    };

    const accessToken = jwt.sign(tokenData, process.env.ACCESS_TOKEN as any, {
      expiresIn: "48h",
    });

    res.cookie("ACCESS_TOKEN", accessToken, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    const { password: userPassword, ...rest } = (user as any)._doc;

    return res.status(200).json({
      message: "Login Successful",
      data: {
        accessToken,
        userInfo: rest,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("ACCESS_TOKEN", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({
      message: "Logged Out",
    });
  } catch (error) {
    next(error);
  }
};
