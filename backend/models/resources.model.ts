import { Schema, model, Document } from "mongoose";

export interface IResources extends Document {
  title: string;
  description: string;
  subject: string;
  courseId: string;
}

const resourcesSchema = new Schema<IResources>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  courseId: { type: String, ref: "Courses", required: true },
});

const Resources = model("Resources", resourcesSchema);

export default Resources;
