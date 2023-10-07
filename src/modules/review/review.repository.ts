import BaseRepository from "../../repository/baseRepository";
import { IReview } from "./model/review.interface";
import Review from "./model/review.model";

class ReviewRepository extends BaseRepository<IReview> {
  constructor() {
    super(Review);
  }
}

export default new ReviewRepository();
