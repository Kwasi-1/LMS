import { model, Schema, Document } from "mongoose";

export interface IParent extends Document {
  name: string;
  email: string;
  password: string;
  children: string[];
  role: "parent";
  gender: "male" | "female";
  status: "active" | "blocked" | "pending";
}

const parentSchema = new Schema<IParent>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    children: [{ type: String, ref: "Students", required: true }],
    role: { type: String, enum: ["parent"], default: "parent" },
    gender: { type: String, enum: ["male", "female"], required: true },
    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

const Parents = model("Parents", parentSchema);

export default Parents;
