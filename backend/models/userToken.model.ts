import { Schema, model, Document } from "mongoose";

interface IUserTokenSchema extends Document {
  userId: Schema.Types.ObjectId;
  token: string;
}

const userTokenSchema = new Schema<IUserTokenSchema>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  token: { type: String, required: true },
});
