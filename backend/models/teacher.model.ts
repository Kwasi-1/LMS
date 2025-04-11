import { model, Schema, Document } from "mongoose";

export interface ITeacher extends Document {
  name: string;
  email: string;
  password: string;
  classes: string[];
  courses: string[];
  role: "teacher";
  status: "active" | "blocked" | "pending";
  gender: "male" | "female";
}

const teacherSchema = new Schema<ITeacher>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    classes: [{ type: String, required: true }],
    courses: [{ type: String, ref: "Courses" }],
    role: { type: String, enum: ["teacher"], default: "teacher" },
    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "active",
    },
    gender: { type: String, enum: ["male", "female"] },
  },
  {
    timestamps: true,
  }
);

const Teachers = model("Teachers", teacherSchema);

export default Teachers;
