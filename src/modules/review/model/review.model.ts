import { Schema, model, Types } from "mongoose";
import { IReview } from "./review.interface";
import addHooks from "./review.hooks";

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Types.ObjectId, ref: "User" },
    company: { type: Types.ObjectId, ref: "User" },
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

reviewSchema.index({ user: 1, company: 1 }, { unique: true });

addHooks(reviewSchema);

const Review = model<IReview>("Review", reviewSchema);

export default Review;
