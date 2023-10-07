import { Request, Response } from "express";
import ReviewService from "./review.service";
import ReviewValidator from "./review.validator";
import sendRes from "../../utils/sendResponse";

class ReviewController {
  static async getReviews(req: Request, res: Response) {
    const { companyId } = await ReviewValidator.ids(req.params);
    const reviews = await ReviewService.getReviews(companyId);
    sendRes(res, 200, { result: reviews.length, reviews });
  }

  static async updateReview(req: Request, res: Response) {
    const { reviewId } = await ReviewValidator.ids(req.params);
    const reviewBody = await ReviewValidator.updateReview(req.body);
    const review = await ReviewService.updateReview(
      req.user.id,
      reviewId,
      reviewBody
    );

    sendRes(res, 200, { review });
  }

  static async createReview(req: Request, res: Response) {
    const { companyId } = await ReviewValidator.ids(req.params);
    const reviewBody = await ReviewValidator.createReview(req.body);
    const review = await ReviewService.createReview(
      companyId,
      req.user.id,
      reviewBody
    );

    sendRes(res, 201, { review });
  }
}

export default ReviewController;
