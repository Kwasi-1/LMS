import { Router } from "express";
import { login, logout, register } from "../controllers/auth";
import {
  setUserProfile,
  updatePassword,
} from "../controllers/lms/student.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/set-user-profile", setUserProfile);
router.post("/update-password", updatePassword);

export default router;
