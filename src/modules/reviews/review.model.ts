import mongoose, { Document, ObjectId } from "mongoose";

export interface IReview extends Document {
  userId: ObjectId;
  companyId: ObjectId;
  rate: number;
  pros: string;
  cons: string;
  review: string;
}

const reviewSchema = new mongoose.Schema<IReview>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
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

export default mongoose.model<IReview>("review", reviewSchema);
