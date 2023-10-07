import { Document, ObjectId } from "mongoose";

export interface IReview extends Document {
  userId: ObjectId;
  companyId: ObjectId;
  rate: number;
  pros: string;
  cons: string;
  review: string;
}
