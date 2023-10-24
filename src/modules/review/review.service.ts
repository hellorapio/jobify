import NotFound from "../../errors/notFound";
import { IReview } from "./model/review.interface";
import reviewRepository from "./review.repository";
import BaseService from "../../bases/base.service";
import companyRepository from "../company/company.repository";

class ReviewService extends BaseService<IReview> {
  constructor() {
    super(reviewRepository);
  }

  override async getAll(company?: any) {
    const reviews = await this.repo.find(company ? { company } : {});
    return reviews;
  }

  async reviewStats(company: string) {
    return await this.repo.aggregate([
      { $match: { company } },
      {
        $group: {
          _id: null,
          avgRate: { $avg: "$rate" },
          count: { $sum: 1 },
        },
      },
    ]);
  }

  override async create(body: object, company?: any, user?: any) {
    const username = await companyRepository.findOne({
      username: company,
    });

    if (!username) throw new NotFound("Company is Not Found");

    const review = await this.repo.insertOne({
      ...body,
      user,
      company,
    });

    return review;
  }
  override async update(user: any, body: IReview, company?: any) {
    const review = await this.repo.updateOne(
      {
        user,
        company,
      },
      body
    );
    if (!review) throw new NotFound("No review was found");

    return review;
  }

  override async delete(company: string, user?: any) {
    const review = await this.repo.deleteOne({
      user,
      company,
    });
    if (!review) throw new NotFound("No review was found");
  }
}

export default ReviewService.getInstance<ReviewService>();
