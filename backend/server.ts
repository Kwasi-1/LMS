import express, { Request, Response } from "express";
const dotenv = require("dotenv");

import { connectToDB } from "./utils/connectToDB";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/general.router";
import adminRouter from "./routes/lms/admin.router";
import generalRouter from "./routes/general.router";
import studentRouter from "./routes/lms/student.router";
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

app.use("/api", userRouter);
app.use("/api/admin", authUser, authRole("admin"), adminRouter);
app.use("/api/student", authUser, studentRouter);
app.use("/api/general", generalRouter);

app.get("/", (req: Request, res: Response) => {
  return res.send("Connect Backend Up and Running!");
});

app.use(errorMiddleware);

app.listen(process.env.PORT, async () => {
  await connectToDB();
  console.log(`Server Running on ${process.env.PORT}`);
});

