import { Router } from "express";
import {
  fetchDashboardInfo,
  fetchUserData,
  getClassCourses,
  getClassQuizzes,
  getCourseData,
  getQuizData,
  submitNewQuiz,
} from "../../controllers/lms/student.controller";

const router = Router();

router.get("/get-course-data/:courseId", getCourseData);

router.post("/get-class-quizzes", getClassQuizzes);
router.post("/get-class-courses", getClassCourses);

router.get("/get-quiz-data/:quizId", getQuizData);

router.post("/submit-quiz", submitNewQuiz);


router.post("/fetch-dashboard-info", fetchDashboardInfo);

export default router;
