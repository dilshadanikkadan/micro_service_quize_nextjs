import mongoose, { Schema, Document, model } from "mongoose";
import { IOption, optionSchema } from "./option.model";

export interface IQuestion extends Document {
  questionText: string;
  options: IOption[];
}

const questionSchema = new Schema<IQuestion>({
  questionText: {
    type: String,
    required: true,
  },
  options: [optionSchema],
});

const QuestionModel = mongoose.models.Question || model<IQuestion>("Question", questionSchema);
export { QuestionModel };