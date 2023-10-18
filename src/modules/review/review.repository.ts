import BaseRepository from "../../bases/base.repository";
import { IReview } from "./model/review.interface";
import Review from "./model/review.model";

class ReviewRepository extends BaseRepository<IReview> {
  constructor() {
    super(Review);
  }
}

export default ReviewRepository.getInstance();
