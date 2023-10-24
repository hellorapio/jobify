import BaseService from "../../bases/base.service";
import NotFound from "../../errors/notFound";
import companyRepository from "../company/company.repository";
import jobRepository from "./job.repository";
import { IJob } from "./model/job.interface";

class JobService extends BaseService<IJob, typeof jobRepository> {
  constructor() {
    super(jobRepository);
  }

  override async create(body: Partial<IJob>, id?: any) {
    const company = await companyRepository.findOne({ user: id });
    if (!company) throw new NotFound("Fake Company");
    return await this.repo.insertOne({
      ...body,
      company: company.username,
      companyName: company.name,
    });
  }

  override async getAll(company?: any) {
    return await this.repo.find(company ? { company } : {});
  }

  override async update(slug: any, body: Partial<IJob>, id?: any) {
    const company = await companyRepository.findOne({ user: id });
    if (!company) throw new NotFound("Fake Company");
    const job = await this.repo.updateOne(
      { company: company.username, slug },
      body
    );

    if (!job) throw new NotFound("No Job was Found");
    return job;
  }

  override async get(slug: any) {
    const job = await this.repo.findOne({ slug });
    if (!job) throw new NotFound("No Job was Found");
    return job;
  }

  override async delete(slug: any, id?: any) {
    const company = await companyRepository.findOne({ user: id });
    if (!company) throw new NotFound("Fake Company");
    const job = await this.repo.deleteOne({
      company: company.username,
      slug,
    });
    if (!job) throw new NotFound("No Job was Found");
  }
}

export default JobService.getInstance<JobService>();
