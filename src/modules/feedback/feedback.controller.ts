import BaseController from "../../bases/base.controller";
import { IFeedback } from "./feedback.interface";
import feedbackService from "./feedback.service";
import feedbackValidator from "./feedback.validator";

class FeedbackController extends BaseController<
  IFeedback,
  typeof feedbackService,
  typeof feedbackValidator
> {
  constructor() {
    super(feedbackService, feedbackValidator);
  }
}

export default FeedbackController.getInstance<FeedbackController>();
