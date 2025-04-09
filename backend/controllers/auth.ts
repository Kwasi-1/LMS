import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import { errorHandler } from "../utils/errorHandlers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateCreateAccount } from "../utils/dataValidation";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = validateCreateAccount.validate(req.body);

    if (error) return next(errorHandler(error.details[0].message, 400));
    
    const { name, email, password, role } = req.body;

    const isUser = await User.findOne({ email: email.toLowerCase() });

    if (isUser) return next(errorHandler("User already exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    const { password: savedPassword, otp: savedOtp, ...rest } = newUser._doc;

    return res.status(200).json({
      message: "Check your email for the OTP to verify your account",
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

    const user = await User.findOne({ email: email.toLowerCase(), role });

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

    const { password: userPassword, ...rest } = user._doc;

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
