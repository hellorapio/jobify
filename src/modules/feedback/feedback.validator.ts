import BaseValidator from "../../bases/base.validator";
import feedbackJoi from "./feedback.joi";

class FeedbackValidator extends BaseValidator {
  constructor() {
    super(feedbackJoi);
  }
}

export default FeedbackValidator.getInstance<FeedbackValidator>();
