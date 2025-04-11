import { Router } from "express";
import {
  CreateCourse,
  createQuiz,
  deleteCourse,
  deleteQuiz,
  getAllQuizzes,
  updateCourse,
  updateQuiz,
  getDashboardInfo,
  createAssignment,
  getAllAssignments,
  addPassco,
  getAllPassco,
  updatePassco,
  deletePassco,
  updateAssignment,
  deleteAssignment
} from "../../controllers/lms/teacher.controller";

const router = Router();

router.get("/get-dashboard-info", getDashboardInfo)

// TODO:
router.post("/create-course", CreateCourse);
router.delete("/delete-course/:id", deleteCourse);
router.put("/update-course", updateCourse);

router.post("/create-assignment", createAssignment)
router.put("/update-assignment/:id", updateAssignment)
router.delete("/delete-assignment/:id", deleteAssignment )
router.get("/get-all-assignments", getAllAssignments)


router.post("/add-passco", addPassco)
router.get("/get-all-passco", getAllPassco)
router.put("/update-passco", updatePassco)
router.delete("/delete-passco/:id", deletePassco)

router.post("/create-quiz", createQuiz);
router.delete("/delete-quiz/:id", deleteQuiz);
router.put("/update-quiz", updateQuiz);
router.get("/get-all-quizzes", getAllQuizzes);

export default router;
