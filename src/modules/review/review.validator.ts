import BaseValidator from "../../bases/base.validator";
import validCatch from "../../utils/validCatch";
import reviewJoi from "./review.joi";

class ReviewValidator extends BaseValidator {
  constructor() {
    super(reviewJoi);
  }

  async ids(id: object) {
    return await validCatch(reviewJoi.ids, id);
  }
}

export default ReviewValidator.getInstance();
