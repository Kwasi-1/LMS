import express, { Request, Response } from "express";
const dotenv = require("dotenv");

import { connectToDB } from "./utils/connectToDB";
import cors from "cors";
import cookieParser from "cookie-parser";

import studentRouter from "./routes/lms/student.router";
import adminRouter from "./routes/lms/admin.router";
import teacherRouter from "./routes/lms/teacher.router";
import parentRouter from "./routes/lms/parent.router";
import generalRouter from "./routes/general.router";
import { errorMiddleware } from "./middlewares/error.middleware";
import { authUser } from "./middlewares/authUser.middleware";
import { authRole } from "./middlewares/authRole.middleware";

dotenv.config();
const app = express();
const corsConfig = {
  credentials: true,
  origin: ["http://localhost:3000"],
};

app.use(express.json());
app.use(cors(corsConfig));
app.use(cookieParser());

app.use("/api", generalRouter);
app.use(
  "/api/admin",
  authUser,
  authRole("admin", "parent", "teacher", "student"),
  adminRouter
);
app.use("/api/teacher", authUser, authRole("teacher"), teacherRouter);
app.use("/api/parent", authUser, authRole("parent"), parentRouter);
app.use("/api/student", authUser, studentRouter);

app.get("/", (req: Request, res: Response) => {
  return res.send("Connect Backend Up and Running!");
});

app.use(errorMiddleware);

app.listen(process.env.PORT, async () => {
  await connectToDB();
  console.log(`Server Running on ${process.env.PORT}`);
});
