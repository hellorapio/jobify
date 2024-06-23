import BaseService from "../../bases/base.service";
import NotFound from "../../errors/notFound";
import { JobsWithIn, QueryObject } from "../../types";
import userRepository from "../user/user.repository";
import jobRepository from "./job.repository";
import { IJob } from "./model/job.interface";

class JobService extends BaseService<IJob, typeof jobRepository> {
  constructor() {
    super(jobRepository);
  }

  async withIn(query: JobsWithIn) {
    const radius =
      query.unit === "mi"
        ? query.distance / 3963.2
        : query.distance / 6378.1;

    const jobs = await this.repo.find(
      {
        location: {
          $geoWithin: { $centerSphere: [[query.lng, query.lat], radius] },
        },
      },
      query,
      "address"
    );

    return jobs;
  }

  override async create(body: Partial<IJob>, id?: any) {
    return await this.repo.insertOne({
      ...body,
      company: id,
    });
  }

  override async getAll(company?: any, query?: QueryObject) {
    if (company) {
      const u = await userRepository.findOne({
        username: company,
        role: "company",
      });

      if (!u) throw new NotFound("Company Not Found");
      const jobs = await this.repo.find({ company: u.id }, query);
      return jobs;
    } else {
      const jobs = await this.repo.find({}, query);

      return jobs;
    }
  }

  override async update(slug: any, body: Partial<IJob>, id?: any) {
    const job = await this.repo.updateOne({ company: id, slug }, body);
    if (!job) throw new NotFound("No Job was Found");
    return job;
  }

  override async get(slug: any) {
    const job = await this.repo.updateOne(
      { slug },
      { $inc: { views: 1 } }
    );
    if (!job) throw new NotFound("No Job was Found");
    return job;
  }

  override async delete(slug: any, id?: any) {
    const job = await this.repo.updateOne(
      {
        company: id,
        slug,
      },
      { isActive: false }
    );
    if (!job) throw new NotFound("No Job was Found");
  }
}

export default JobService.getInstance<JobService>();
