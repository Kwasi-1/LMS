import { Schema, Document, model } from "mongoose";
import { CourseDataProps } from "../utils/lms/validateCreateCourse";

interface ICourse extends Document, CourseDataProps {}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    instructor: { type: String, ref: "Users", required: true },
    subject: { type: String, required: true },
    userClass: { type: String, required: true },
    tags: [{ type: String }, { required: true }],
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    benefits: [{ benefit: String }, { required: true }],
    thumbnail: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "archived", "draft"],
      default: "active",
    },
    sections: [
      {
        sectionTitle: String,
        sectionType: { type: String, enum: ["quiz", "assignment", "lesson"] },
        duration: Number,
        lessons: [
          {
            lessonTitle: String,
            videoDescription: String,
            videoDuration: String,
            videoUrl: String,
          },
        ],
      },
      { required: true },
    ],
  },
  { timestamps: true }
);

const Courses = model("Courses", courseSchema);

export default Courses;
