import { Schema, model, Document } from "mongoose";

type QuizOptions = "Yes" | "No";

export interface QuizDataProps extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  duration: number;
  revealAnswersAfterQuiz: QuizOptions;
  retake: QuizOptions;
  randomize: QuizOptions;
  linear: QuizOptions;
  quizDate: string;
  quizTime: string;
  questionsArray: {
    question: string;
    options: [];
    answers: [];
  };
  subject: string;
  userClass: string;
  thumbnail: string;
  quizStartTime: Date;
  numberOfQuestions: number;
  category: "General" | "Class-Based";
}

const quizSchema = new Schema<QuizDataProps>(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    revealAnswersAfterQuiz: {
      type: String,
      required: true,
      enum: ["Yes", "No"],
    },
    retake: { type: String, required: true, enum: ["Yes", "No"] },
    randomize: { type: String, required: true, enum: ["Yes", "No"] },
    linear: { type: String, required: true, enum: ["Yes", "No"] },
    quizDate: { type: String, required: true },
    quizTime: { type: String, required: true },
    questionsArray: { type: Array, required: true },
    userClass: { type: String, required: true },
    subject: { type: String, required: true },
    quizStartTime: { type: Date, required: true },
    numberOfQuestions: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ["General", "Class-Based"],
    },
  },
  { timestamps: true }
);

const Quiz = model("Quizzes", quizSchema);

export default Quiz;
