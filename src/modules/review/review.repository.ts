import BaseRepository from "../../bases/base.repository";
import APIFeatures from "../../utils/apiFeatures";
import { IReview } from "./model/review.interface";
import Review from "./model/review.model";

class ReviewRepository extends BaseRepository<IReview> {
  constructor() {
    super(Review);
  }

  override async find(filter: any, queryObj?: any): Promise<any> {
    return await new APIFeatures(this.model.find(filter), queryObj)
      .paginate()
      .sort().query;
  }
}

export default ReviewRepository.getInstance<ReviewRepository>();
