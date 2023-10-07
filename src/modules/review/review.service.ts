import { ObjectId } from "mongoose";
import NotFound from "../../errors/notFound";
import { IReview } from "./model/review.interface";
import reviewRepository from "./review.repository";

class ReviewService {
  static async getReviews(companyId: ObjectId) {
    const reviews = await reviewRepository.find({ companyId });
    return reviews;
  }

  static async createReview(
    companyId: ObjectId,
    userId: ObjectId,
    reviewData: IReview
  ) {
    const review = await reviewRepository.insertOne({
      ...reviewData,
      userId,
      companyId,
    });

    return review;
  }

  static async updateReview(
    userId: ObjectId,
    reviewId: string,
    reviewData: IReview
  ) {
    const review = await reviewRepository.updateOne(
      {
        _id: reviewId,
        userId,
      },
      reviewData
    );

    if (!review) throw new NotFound("No review was found");

    return review;
  }

  static async deleteReview(reviewId: string) {
    const review = await reviewRepository.deleteOneById(reviewId);
    if (!review) throw new NotFound("No review was found");
  }
}

export default ReviewService;
