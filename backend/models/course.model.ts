import { Schema, Document, model } from "mongoose";
import { CourseDataProps } from "../utils/lms/validateCreateCourse";

interface ICourse extends Document, CourseDataProps {}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    purchases: { type: Number, default: 0 },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tags: [{ type: String }, { required: true }],
    level: { type: String, required: true },
    demoLink: { type: String },
    category: { type: String, required: true },
    benefits: [{ benefit: String }, { required: true }],
    prerequisites: [{ prerequisite: String }, { required: true }],
    thumbnail: { type: String, required: true },
    userClass: String,
    subject: String,
    sections: [
      {
        sectionTitle: String,
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

const Course = model("Courses", courseSchema);

export default Course;
