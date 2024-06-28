import BaseRepository from "../../bases/base.repository";
import QueryBuilder from "../../utils/queryBuilder";
import { IReview } from "./model/review.interface";
import Review from "./model/review.model";

class ReviewRepository extends BaseRepository<IReview> {
  constructor() {
    super(Review);
  }

  //@ts-ignore
  override async find(filter: any, queryObj?: any): Promise<any> {
    return await new QueryBuilder(this.model, queryObj).execute();
  }
}

export default ReviewRepository.getInstance<ReviewRepository>();
