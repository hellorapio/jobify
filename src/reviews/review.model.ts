import mongoose, { InferSchemaType } from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "There is no review without a rate"],
  },
  createdAt: {
    type: Date,
    readonly: true,
    default: Date.now,
  },
  pros: String,
  cons: String,
  review: String,
});

reviewSchema.pre(/^find/, function (next) {
  //@ts-ignore
  this.populate({ path: "userId", select: "name photo" });

  next();
});

type Review = InferSchemaType<typeof reviewSchema>;

export default mongoose.model<Review>("review", reviewSchema);
