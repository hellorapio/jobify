import Review from "./review.model";
import APIFeatures from "../../utils/apiFeatures";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";

export const getReviews = catchAsync(async (req, res, next) => {
  const review = await Review.find({ companyId: req.params.companyId });

  res.status(200).json({
    status: "Success",
    review,
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { companyId, reviewId } = req.params;
  const review = await Review.findOneAndUpdate(
    {
      userId: req.user!.id,
      _id: reviewId,
      companyId,
    },
    req.body,
    { runValidators: true, new: true }
  );

  res.status(200).json({
    status: "Success",
    review,
  });
});

export const createReview = catchAsync(async (req, res, next) => {
  const review = await Review.create({
    ...req.body,
    userId: req.user!.id,
    companyId: req.params.companyId,
  });

  res.status(201).json({
    status: "Success",
    review,
  });
});
