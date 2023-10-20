import { Schema, model, Types } from "mongoose";
import { IReview } from "./review.interface";
import addHooks from "./review.hooks";

const reviewSchema = new Schema<IReview>(
  {
    userId: Types.ObjectId,
    companyId: Types.ObjectId,
    rate: Number,
    pros: String,
    cons: String,
    review: String,
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

addHooks(reviewSchema);

const Review = model<IReview>("Review", reviewSchema);

export default Review;
