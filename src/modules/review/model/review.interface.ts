import { Document, ObjectId } from "mongoose";

export interface IReview extends Document {
  user: ObjectId;
  company: ObjectId;
  rate: number;
  pros: string;
  cons: string;
  review: string;
}
