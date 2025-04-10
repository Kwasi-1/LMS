import { Schema, model, Document } from "mongoose";

type QuizOptions = "Yes" | "No";

export interface QuizDataProps extends Document {
  _id: Schema.Types.ObjectId;
  title: string;
  subject: string;
  userClass: string;
  courseId: string;
  duration: number;
  showResults: QuizOptions;
  retake: QuizOptions;
  randomize: QuizOptions;
  linear: QuizOptions;
  questionsArray: {
    question: string;
    options: [];
    answers: [];
  };
  quizStartTime: Date;
  quizDeadline: string;
  numberOfQuestions: number;
}

const quizSchema = new Schema<QuizDataProps>(
  {
    title: { type: String, required: true },
    duration: { type: Number, required: true },
    showResults: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },
    courseId: { type: String, ref: "Courses" },
    retake: { type: String, required: true, enum: ["Yes", "No"] },
    randomize: { type: String, required: true, enum: ["Yes", "No"] },
    linear: { type: String, required: true, enum: ["Yes", "No"] },
    questionsArray: { type: Array, required: true },
    userClass: { type: String, required: true },
    subject: { type: String, required: true },
    quizStartTime: { type: Date, required: true },
    quizDeadline: { type: String, required: true },
    numberOfQuestions: { type: Number, required: true },   
  },
  { timestamps: true }
);

const Quiz = model("Quizzes", quizSchema);

export default Quiz;
