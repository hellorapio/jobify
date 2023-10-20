import NotFound from "../../errors/notFound";
import { IReview } from "./model/review.interface";
import reviewRepository from "./review.repository";
import BaseService from "../../bases/base.service";

class ReviewService extends BaseService<IReview> {
  constructor() {
    super(reviewRepository);
  }

  override async getAll(companyId?: any) {
    const reviews = await this.repo.find({ companyId });
    return reviews;
  }

  override async create(body: object, companyId?: any, userId?: any) {
    const review = await this.repo.insertOne({
      ...body,
      userId,
      companyId,
    });

    return review;
  }

  async updateReview(userId: any, reviewId: string, reviewData: IReview) {
    const review = await this.repo.updateOne(
      {
        _id: reviewId,
        userId,
      },
      reviewData
    );

    if (!review) throw new NotFound("No review was found");

    return review;
  }

  override async delete(reviewId: string) {
    const review = await this.repo.deleteOneById(reviewId);
    if (!review) throw new NotFound("No review was found");
  }
}

export default ReviewService.getInstance();
