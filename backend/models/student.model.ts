import { Document, Schema, model } from "mongoose";

export interface IStudent extends Document {
  _doc?: any;
  id: string;
  password: string;
  name: string;
  role: "student";
  userClass: string;
  status: "active" | "blocked" | "pending";
  gender: "male" | "female";
}

const studentSchema = new Schema<IStudent>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["student"],
      default: "student",
    },
    userClass: { type: String },
    gender: { type: String, enum: ["male", "female"] },
    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Students = model("Students", studentSchema);

export default Students;
