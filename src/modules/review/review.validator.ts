import validCatch from "../../utils/validCatch";
import reviewJoi from "./review.joi";

class ReviewValidator {
  static async ids(id: object) {
    return await validCatch(reviewJoi.ids, id);
  }

  static async updateReview(body: object) {
    return await validCatch(reviewJoi.updateReview, body);
  }

  static async createReview(body: object) {
    return await validCatch(reviewJoi.createReview, body);
  }
}

export default ReviewValidator;
