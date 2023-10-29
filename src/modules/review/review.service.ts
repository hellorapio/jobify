import NotFound from "../../errors/notFound";
import { IReview } from "./model/review.interface";
import reviewRepository from "./review.repository";
import BaseService from "../../bases/base.service";
import userRepository from "../user/user.repository";

class ReviewService extends BaseService<IReview> {
  constructor() {
    super(reviewRepository);
  }

  override async getAll(company?: any) {
    if (company) {
      const u = await userRepository.findOne({
        username: company,
        role: "company",
      });
      
      if (!u) throw new NotFound("Company Not Found");
      const reviews = await this.repo.find({ company: u.id });
      return reviews;
    } else {
      const reviews = await this.repo.find({});
      return reviews;
    }
  }

  override async create(body: object, company?: any, user?: any) {
    const u = await userRepository.findOne({
      username: company,
      role: "company",
    });
    if (!u) throw new NotFound("User Not Found");
    const review = await this.repo.insertOne({
      ...body,
      user,
      company: u.id,
    });

    return review;
  }
  override async update(user: any, body: IReview, company?: any) {
    const u = await userRepository.findOne({
      username: company,
      role: "company",
    });
    if (!u) throw new NotFound("User Not Found");
    const review = await this.repo.updateOne(
      {
        user,
        company: u.id,
      },
      body
    );
    if (!review) throw new NotFound("No review was found");
    return review;
  }

  override async delete(company: any, user?: any) {
    const u = await userRepository.findOne({
      username: company,
      role: "company",
    });
    if (!u) throw new NotFound("User Not Found");
    const review = await this.repo.deleteOne({
      user,
      company: u.id,
    });
    if (!review) throw new NotFound("No review was found");
  }
}

export default ReviewService.getInstance<ReviewService>();
