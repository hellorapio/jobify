import { Schema, model, Types } from "mongoose";
import { IReview } from "./review.interface";

const reviewSchema = new Schema<IReview>(
  {
    userId: {
      type: Types.ObjectId,
      ref: "Worker",
    },
    companyId: {
      type: Types.ObjectId,
      ref: "Company",
      path: "",
    },
    rate: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "There is no review without a rate"],
    },
    pros: String,
    cons: String,
    review: String,
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  //@ts-ignore
  this.populate({ path: "userId", select: "name photo" });

  next();
});

const Review = model<IReview>("review", reviewSchema);

export default Review;
