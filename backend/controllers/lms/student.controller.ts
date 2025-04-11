import { Request, NextFunction, Response } from "express";
import Course from "../../models/course.model";
import { errorHandler } from "../../utils/errorHandlers";
import Quiz from "../../models/quiz.model";
import UsersQuizData from "../../models/usersQuizData.model";
import bcrypt from "bcrypt";
import Students from "../../models/student.model";

export const getCourseData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.courseId;

    if (!id) return next(errorHandler("Id is required", 400));

    const course = await Course.findById(id);

    if (!course) return next(errorHandler("Course Not found", 400));

    return res.status(200).json({
      message: "Course Data Fetched Successfully",
      data: course,
    });
  } catch (error) {
    next(error);
  }
};

export const getClassQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userClass } = req.body;

    let quizzes;

    if (userClass === "Class6" || userClass === "Class8") {
      quizzes = await Quiz.find({ userClass: userClass })
        .sort({ updatedAt: -1 })
        .select(
          "name duration quizStartTime numberOfQuestions thumbnail retake"
        );
    } else {
      quizzes = await Quiz.find({
        $or: [{ userClass: userClass }, { category: "General" }],
      })
        .sort({ updatedAt: -1 })
        .select(
          "name duration quizStartTime numberOfQuestions thumbnail retake"
        );
    }

    let currentQuizzes: any = [];

    quizzes.forEach((quiz) => {
      if (quiz.retake === "Yes") {
        currentQuizzes.push(quiz);
      } else {
        const quizDateTime = new Date(quiz.quizStartTime);

        const quizEndTime = new Date(quizDateTime);

        quizEndTime.setMinutes(quizEndTime.getMinutes() + quiz.duration);

        const currentDate = new Date();

        if (currentDate >= quizDateTime && currentDate <= quizEndTime) {
          currentQuizzes.push(quiz);
        }
      }
    });

    return res.status(200).json({
      message: "Quizzes Fetched",
      data: currentQuizzes,
    });
  } catch (error) {
    next(error);
  }
};

export const getQuizData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.quizId;
    if (!id) return next(errorHandler("Id is required", 400));

    const quizData = await Quiz.findById(id);

    if (!quizData) return next(errorHandler("Quiz not found", 400));

    let { duration, ...quiz } = (quizData as any)._doc;

    const durationMS = duration * 60 * 1000;

    let endTime = new Date(quizData.quizStartTime);
    endTime.setMinutes(endTime.getMinutes() + duration);

    let timeLeftMS;
    let status;

    const currentTime = new Date();

    if (quiz.retake === "No") {
      timeLeftMS = endTime.getTime() - currentTime.getTime();
      status = timeLeftMS > 0 ? "Active" : "Expired";
    } else {
      timeLeftMS = duration * 60 * 1000;
    }

    return res.status(200).json({
      message: "Quiz Fetched",
      data: { durationMS, timeLeftMS, status, ...quiz },
    });
  } catch (error) {
    next(error);
  }
};

export const submitNewQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { quizId, answers, quizName } = req.body;
    const { userId } = req;

    if (!quizId) return next(errorHandler("Quiz Id Required", 400));

    const isQuiz = await UsersQuizData.findOne({ quizId });

    const data: any = await Quiz.findById(quizId).select("questionsArray");

    const questions = data.questionsArray;

    let calculatedScore: number = 0;

    const markQuestions = () => {
      questions.forEach((question: any) => {
        if (answers[`${question.question}`] === question.answer) {
          calculatedScore++;
        }
      });
    };

    markQuestions();

    if (isQuiz) {
      const scores = isQuiz.scores;
      scores.push(calculatedScore);
      await UsersQuizData.findOneAndUpdate({ quizId }, { scores });

      return res.status(200).json({
        message: "Quiz Updated Successfully",
      });
    } else {
      await UsersQuizData.create({
        userId,
        quizId,
        scores: calculatedScore,
        numberOfQuestions: questions.length,
        quizName,
      });

      return res.status(200).json({
        message: "New Quiz Data Added",
      });
    }
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
    const { userClass } = req.body;

    const quizzes = await Quiz.find({ userClass }).select(
      "quizStartTime retake name duration"
    );

    const upcomingQuizzes = quizzes.filter((quiz) => {
      const quizDateTime = new Date(quiz.quizStartTime);

      const quizEndTime = new Date(quizDateTime);

      quizEndTime.setMinutes(quizEndTime.getMinutes() + quiz.duration);

      const currentDate = new Date();
      return (
        quiz.retake === "No" &&
        currentDate <= quizDateTime &&
        currentDate <= quizEndTime
      );
    });

    const totalCourses = await Course.countDocuments({
      $or: [{ userClass: userClass }, { category: "General" }],
    }).sort({ createdAt: -1 });

    const quizzesTaken = await UsersQuizData.find({ userId: req.userId })
      .select("scores numberOfQuestions quizName")
      .sort({ updatedAt: -1 });

    const payload = {
      quizzesTaken,
      totalCourses,
      quizzes,
      upcomingQuizzes: upcomingQuizzes,
    };

    return res.status(200).json({
      data: payload,
      message: "Dashboard Info Fetched",
    });
  } catch (error) {
    next(error);
  }
};

export const setUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role, userClass, level, gender, profileUsername } = req.body;

    const user = await Students.findById(req.userId);

    let profilePicture;

    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${profileUsername}`;
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${profileUsername}`;

    profilePicture = gender === "male" ? boyProfilePic : girlProfilePic;

    if (!user) return next(errorHandler("Couldn't Update User", 404));

    user.role = role;
    user.gender = gender;

    if (userClass) user.userClass = userClass;

    await user.save();

    const { password: hashPassword, ...rest } = user._doc;

    return res.status(200).json({
      message: "Profile Updated Successfully",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword) return next(errorHandler("Old Password Required", 404));
    if (!newPassword) return next(errorHandler("New Password Required", 400));

    const user = await Students.findByIdAndUpdate(req.userId);
    if (!user) return next(errorHandler("User Not Found", 404));

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) return next(errorHandler("Incorrect Password", 404));

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getClassCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userClass } = req.body;
    const allCourses = await Course.find({
      $or: [{ userClass: userClass }, { category: "General" }],
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Courses Fetched",
      data: allCourses,
    });
  } catch (error) {
    next(error);
  }
};
