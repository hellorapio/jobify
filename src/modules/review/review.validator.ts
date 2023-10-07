import validCatch from "../../utils/validCatch";
import reviewJoi from "./review.joi";

class ReviewValidator {
  static async ids(id: object) {
    const data = await validCatch(reviewJoi.ids, id);
    return data;
  }

  static async updateReview(body: object) {
    const data = await validCatch(reviewJoi.updateReview, body);
    return data;
  }

  static async createReview(body: object) {
    const data = await validCatch(reviewJoi.createReview, body);
    return data;
  }
}

export default ReviewValidator;
