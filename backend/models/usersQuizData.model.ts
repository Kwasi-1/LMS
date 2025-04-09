import { Schema, Document, model } from "mongoose";

interface IUsersQuizData extends Document {
  userId: string;
  quizId: string;
  scores: number[];
  numberOfQuestions: number;
  quizName: string;
}

const usersQuizDataSchema = new Schema<IUsersQuizData>(
  {
    userId: { type: String, ref: "Users", required: true },
    quizId: { type: String, ref: "Quizzes", required: true },
    scores: [{ type: String, required: true }],
    numberOfQuestions: { type: Number, required: true },
    quizName: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UsersQuizData = model("UsersQuizData", usersQuizDataSchema);

export default UsersQuizData;
