import { Router } from "express";
import { login, logout, register } from "../controllers/auth";
import {
  setUserProfile,
  updatePassword,
} from "../controllers/lms/student.controller";
import { getAllCourses } from "../controllers/lms/admin.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/set-user-profile", setUserProfile);
router.post("/update-password", updatePassword);
router.get("/get-all-courses", getAllCourses);

export default router;
