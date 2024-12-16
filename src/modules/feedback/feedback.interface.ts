import { Document } from "mongoose";

export interface IFeedback extends Document {
  name: string;
  email: string;
  message: number;
}
