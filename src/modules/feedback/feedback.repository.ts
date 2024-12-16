import BaseRepository from "../../bases/base.repository";
import { IFeedback } from "./feedback.interface";
import Feedback from "./feedback.model";

class FeedbackRepository extends BaseRepository<IFeedback> {
  constructor() {
    super(Feedback);
  }
}

export default FeedbackRepository.getInstance<FeedbackRepository>();
