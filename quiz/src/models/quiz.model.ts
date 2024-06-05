import mongoose, { Schema, Document, model } from "mongoose";


export interface IQuiz extends Document {
  title: string;
  thumbnail: string;
  questions: any;
}

const quizSchema = new Schema<IQuiz>({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

const QuizModel = model<IQuiz>("Quiz", quizSchema);
export { QuizModel };
  