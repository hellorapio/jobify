import BaseValidator from "../../bases/base.validator";
import reviewJoi from "./review.joi";

class ReviewValidator extends BaseValidator {
  constructor() {
    super(reviewJoi);
  }

}

export default ReviewValidator.getInstance();
