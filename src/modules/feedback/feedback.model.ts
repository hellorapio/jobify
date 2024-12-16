import { Schema, model } from "mongoose";
import { IFeedback } from "./feedback.interface";

const schema = new Schema<IFeedback>(
  {
    name: String,
    email: { type: String },
    message: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Feedback = model<IFeedback>("Feedback", schema);

export default Feedback;
