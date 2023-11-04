import BaseService from "../../bases/base.service";
import NotFound from "../../errors/notFound";
import jobRepository from "../job/job.repository";
import applicantRepository from "./applicant.repository";
import { IApplicant } from "./model/applicant.interface";

class ApplicantService extends BaseService<
  IApplicant,
  typeof applicantRepository
> {
  constructor() {
    super(applicantRepository);
  }

  async updateApplicant(job: string, letter: string, worker: any) {
    const applicant = await this.repo.updateOne(
      {
        job,
        worker,
      },
      { letter }
    );

    if (!applicant) throw new NotFound("There is no applicant");
  }

  async deleteApplicant(job: string, worker: any) {
    const applicant = await this.repo.deleteOne({
      worker,
      job,
    });

    if (!applicant) throw new NotFound("There is no Applicant here");
  }

  override async getAll(company?: string, job?: string, query?: any) {
    return await this.repo.find({ company, job }, query);
  }

  async replyApplicant(id: string, company: any, status: string) {
    const applicant = await this.repo.updateOne(
      { _id: id, company },
      { status }
    );

    if (!applicant) throw new NotFound("There is no applicant over here");
  }

  override async create({ letter }: IApplicant, slug?: any, worker?: any) {
    const job = await jobRepository.findOne(
      { slug, isActive: true },
      "company"
    );
    if (!job) throw new NotFound("there is No Job");
    const applicant = await this.repo.insertOne({
      company: job.company,
      worker,
      job: slug,
      letter,
    });
    return applicant;
  }

  async getUserApplicants(id: string, role: string, query?: any) {
    return role === "worker"
      ? await this.repo.find({ worker: id }, query)
      : await this.repo.find({ company: id }, query);
  }
}

export default ApplicantService.getInstance<ApplicantService>();
