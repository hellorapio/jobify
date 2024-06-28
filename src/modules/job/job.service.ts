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

  async suggestions({ q }: { q: string }) {
    const [suggestions] = await this.repo.find({
      fields: "title",
      limit: 6,
      title: { $regex: `${q}`, $options: "i" },
    });

    return Array.from(new Set(suggestions.map((job: IJob) => job.title)));
  }

  async withIn(query: JobsWithIn) {
    const radius =
      query.unit === "mi"
        ? query.distance / 3963.2
        : query.distance / 6378.1;

    query.location = {
      $geoWithin: { $centerSphere: [[query.lng, query.lat], radius] },
    };

    const jobs = await this.repo.find(query);

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
      const user = await userRepository.findOne({
        username: company,
        role: "company",
      });

      if (!user) throw new NotFound("Company Not Found");
      query = query || {};
      query.company = user.id;

      const jobs = await this.repo.find(query);
      return jobs;
    } else {
      const [documents, count] = await this.repo.find(query);
      return { documents, count };
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
