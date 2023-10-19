import { Request, Response } from "express";
import reviewService from "./review.service";
import reviewValidator from "./review.validator";
import sendResponse from "../../utils/sendResponse";
import BaseController from "../../bases/base.controller";
import { IReview } from "./model/review.interface";

class ReviewController extends BaseController<
  IReview,
  typeof reviewService
> {
  constructor() {
    super(reviewService, reviewValidator);
  }

  async getReviews(req: Request, res: Response) {
    const { companyId } = await this.validator.ids(req.params);
    const reviews = await this.service.getReviews(companyId);
    sendResponse(res, 200, { result: reviews.length, reviews });
  }

  async updateReview(req: Request, res: Response) {
    const { reviewId } = await this.validator.ids(req.params);
    const reviewBody = await this.validator.update(req.body);
    const review = await this.service.updateReview(
      req.user.id,
      reviewId,
      reviewBody
    );

    sendResponse(res, 200, { review });
  }

  async createReview(req: Request, res: Response) {
    const { companyId } = await this.validator.ids(req.params);
    const reviewBody = await this.validator.create(req.body);
    const review = await this.service.createReview(
      companyId,
      req.user.id,
      reviewBody
    );

    sendResponse(res, 201, { review });
  }
}

export default ReviewController;
