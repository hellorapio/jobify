import validationCatch from "../../utils/validCatch";
import reviewValidator from "./review.validator";
import sendRes from "../../utils/sendResponse";
import validators from "../../utils/validators";
import ReviewService from "./review.service";
import { Request, Response } from "express";

export const getReviews = async (req: Request, res: Response) => {
  const { companId } = await validationCatch(
    reviewValidator.ids,
    req.params
  );
  const reviews = await ReviewService.getReviews(companId);
  sendRes(res, 200, { result: reviews.length, reviews });
};

export const updateReview = async (req: Request, res: Response) => {
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
};

export const createReview = async (req: Request, res: Response) => {
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
};
