import AppError from "../../utils/appError";
import Review, { IReview } from "./review.model";

class ReviewService {
  static async getReviews(companyId: string) {
    const reviews = await Review.find({ companyId });
    if (!reviews) throw new AppError("No reviews were found", 404);
    return reviews;
  }

  static async createReview(
    companyId: string,
    userId: string,
    reviewData: IReview
  ) {
    const review = await Review.create({
      ...reviewData,
      userId,
      companyId,
    });

    return review;
  }

  static async updateReview(
    userId: string,
    reviewId: string,
    reviewData: IReview
  ) {
    const review = await Review.findOneAndUpdate(
      {
        _id: reviewId,
        userId,
      },
      reviewData,
      { runValidators: true, new: true }
    );

    if (!review) throw new AppError("No review was found", 404);

    return review;
  }
  
  static async deleteReview() {}
}

export default ReviewService;
