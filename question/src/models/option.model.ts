import mongoose, { Schema, Document, model } from 'mongoose';

export interface IOption extends Document {
  text: string;
  isCorrect: boolean;
}

export const optionSchema = new Schema<IOption>({
  text: {
    type: String,
    required: true
  },
  isCorrect: {
    type: Boolean,
    required: true
  }
});

const OptionModel =mongoose.models.Option || model<IOption>('Option', optionSchema);
export { OptionModel };