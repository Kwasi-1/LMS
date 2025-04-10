import { Schema, Document, model } from "mongoose";

interface IAssignment extends Document {
  title: string;
  course: string;
  dueDate: string;
  status: "published" | "draft";
  points: number;
  description: string;
  instructor: string;
}

const assignmentSchema = new Schema<IAssignment>({
  title: { type: String, required: true },
  course: { type: String, ref: "Courses", required: true },
  dueDate: { type: String, required: true },
  status: { type: String, default: "draft", enum: ["publish", "draft", "pending", "graded"] },
  points: { type: Number, required: true },
  description: { type: String, required: true },
  instructor: { type: String, ref: "Users" },
});

const Assignments = model("Assignments", assignmentSchema);

export default Assignments;
