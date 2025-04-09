import { Router } from "express";
import {
  CreateCourse,
  createQuiz,
  deleteCourse,
  deleteQuiz,
  fetchDashboardInfo,
  getAllQuizzes,
  updateCourse,
  updateQuiz,
  getAllUsers,
  deleteUser,
  fetchUserData ,
  createNewUser,
  updateUserCredentials
} from "../../controllers/lms/admin.controller";


const router = Router();

router.post("/create-course", CreateCourse);
router.post("/create-quiz", createQuiz);
router.delete("/delete-course/:id", deleteCourse);
router.put("/update-course", updateCourse);

router.delete("/delete-quiz/:id", deleteQuiz);
router.put("/update-quiz", updateQuiz);
router.get("/get-all-quizzes", getAllQuizzes);

router.post("/create-new-user", createNewUser)
router.put("/update-user/:id", updateUserCredentials); 
router.get("/fetch-user-data/:id", fetchUserData);
router.delete("/delete-user/:id", deleteUser);
router.get("/get-all-users", getAllUsers);

router.get("/fetch-dashboard-info", fetchDashboardInfo);

export default router;
