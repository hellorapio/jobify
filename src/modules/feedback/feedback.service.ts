import BaseService from "../../bases/base.service";
import { IFeedback } from "./feedback.interface";
import feedbackRepository from "./feedback.repository";

class FeedbackService extends BaseService<
  IFeedback,
  typeof feedbackRepository
> {
  constructor() {
    super(feedbackRepository);
  }
}

export default FeedbackService.getInstance<FeedbackService>();
