import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
  _doc?: any;
  email: string;
  password: string;
  name: string;
  isEmailVerified: boolean;
  role: string;
  userClass: string;
  status: "active" | "inactive" | "pending";
  avatar: string;
  gender?: "male" | "female";
  level?: string;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["general", "student", "teacher", "parent", "admin"],
      required: true,
    },
    userClass: { type: String },
    avatar: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/03/53/11/00/360_F_353110097_nbpmfn9iHlxef4EDIhXB1tdTD0lcWhG9.jpg",
    },
    gender: { type: String, enum: ["male", "female"] },
    level: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);

export default User;
