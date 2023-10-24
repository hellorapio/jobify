import { Request, Response } from "express";
import service from "./review.service";
import reviewValidator from "./review.validator";
import sendResponse from "../../utils/sendResponse";
import BaseController from "../../bases/base.controller";
import { IReview } from "./model/review.interface";

class ReviewController extends BaseController<IReview, typeof service> {
  constructor() {
    super(service, reviewValidator);
    this.reviewStats = this.reviewStats.bind(this);
  }

  override async getAll(req: Request, res: Response) {
    const { username } = await this.validator.ids(req.params);
    const reviews = await this.service.getAll(username);
    sendResponse(res, 200, { result: reviews.length, reviews });
  }

  override async update(req: Request, res: Response) {
    const { username } = await this.validator.ids(req.params);
    const body = await this.validator.update(req.body);
    const review = await this.service.update(req.user.id, body, username);
    sendResponse(res, 200, { review });
  }

  override async create(req: Request, res: Response) {
    const { username } = await this.validator.ids(req.params);
    const body = await this.validator.create(req.body);
    const review = await this.service.create(body, username, req.user.id);
    sendResponse(res, 201, { review });
  }

  override async delete(req: Request, res: Response) {
    const { username } = await this.validator.ids(req.params);
    await this.service.delete(username, req.user.id);
    sendResponse(res, 204);
  }

  async reviewStats(req: Request, res: Response) {
    const { username } = await this.validator.ids(req.params);
    const stats = await this.service.reviewStats(username);
    sendResponse(res, 200, { stats });
  }
}

export default ReviewController.getInstance<ReviewController>();
