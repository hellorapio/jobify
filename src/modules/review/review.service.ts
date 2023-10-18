import { ObjectId } from "mongoose";
import NotFound from "../../errors/notFound";
import { IReview } from "./model/review.interface";
import reviewRepository from "./review.repository";
import BaseService from "../../bases/base.service";

class ReviewService extends BaseService<IReview> {
  constructor() {
    super(reviewRepository);
  }

  async getReviews(companyId: ObjectId) {
    const reviews = await this.repo.find({ companyId });
    return reviews;
  }

  async createReview(
    companyId: ObjectId,
    userId: ObjectId,
    reviewData: IReview
  ) {
    const review = await this.repo.insertOne({
      ...reviewData,
      userId,
      companyId,
    });

    return review;
  }

  async updateReview(
    userId: ObjectId,
    reviewId: string,
    reviewData: IReview
  ) {
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

  async deleteReview(reviewId: string) {
    const review = await this.repo.deleteOneById(reviewId);
    if (!review) throw new NotFound("No review was found");
  }
}

export default ReviewService.getInstance();
