import catchAsync from "../../utils/catchAsync";
import validationCatch from "../../utils/validationCatch";
import reviewValidator from "./review.validator";
import sendRes from "../../utils/sendRes";
import validators from "../../utils/validators";
import ReviewService from "./review.service";

export const getReviews = catchAsync(async (req, res) => {
  const { companId } = await validationCatch(
    reviewValidator.ids,
    req.params
  );
  const reviews = await ReviewService.getReviews(companId);
  sendRes(res, 200, { result: reviews.length, reviews });
});

export const updateReview = catchAsync(async (req, res) => {
  const { reviewId } = await validationCatch(
    reviewValidator.ids,
    req.params
  );
  const reviewBody = await validationCatch(
    reviewValidator.updateReview,
    req.body
  );
  const review = await ReviewService.updateReview(
    req.user.id,
    reviewId,
    reviewBody
  );

  sendRes(res, 200, { review });
});

export const createReview = catchAsync(async (req, res) => {
  const { id: companyId } = await validationCatch(validators.mongoId, {
    id: req.params.companyId,
  });
  const reviewBody = await validationCatch(
    reviewValidator.createReview,
    req.body
  );
  const review = await ReviewService.createReview(
    companyId,
    req.user.id,
    reviewBody
  );

  sendRes(res, 201, { review });
});
