import { Document, ObjectId } from "mongoose";

export interface IReview extends Document {
  user: ObjectId;
  company: string;
  rate: number;
  pros: string;
  cons: string;
  review: string;
}
