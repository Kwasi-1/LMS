import { Router } from "express";
import {
  fetchDashboardInfo,
  getAllUsers,
  deleteUser,
  fetchUserData,
  createNewUser,
  updateUserCredentials,
} from "../../controllers/lms/admin.controller";

const router = Router();

router.post("/create-new-user", createNewUser);
router.put("/update-user/:id", updateUserCredentials);
router.get("/fetch-user-data/:id", fetchUserData);
router.post("/delete-user/:role/:id", deleteUser);
router.get("/get-all-users", getAllUsers);

router.get("/fetch-dashboard-info", fetchDashboardInfo);

export default router;
