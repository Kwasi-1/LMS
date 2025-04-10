import { Document, Schema, model } from "mongoose";

interface IAdmin extends Document {
  _doc?: any;
  email: string;
  password: string;
  name: string;
  role: "admin";
  status: "active" | "blocked" | "pending";
  gender: "male" | "female";
}

const adminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    gender: { type: String, enum: ["male", "female"] },
    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Admins = model("Admins", adminSchema);

export default Admins;
