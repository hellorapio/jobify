import BaseService from "../../bases/base.service";
// import BadRequest from "../../errors/badRequest";
import NotFound from "../../errors/notFound";
import jobRepository from "../job/job.repository";
import applicantRepository from "./applicant.repository";
import { IApplicant } from "./model/applicant.interface";

class ApplicantService extends BaseService<IApplicant> {
  constructor() {
    super(applicantRepository);
  }

  async updateApplicant(applicantId: string, worker: any, letter: string) {
    const applicant = await this.repo.updateOne(
      {
        _id: applicantId,
        worker,
      },
      { letter }
    );

    if (!applicant) throw new NotFound("There is no applicant");
  }

  async getApplicant(applicantId: string, worker: any) {
    const applicant = await this.repo.findOne({
      _id: applicantId,
      worker,
    });

    if (!applicant) throw new NotFound("There is no Applicant here");

    return applicant;
  }

  async getJobApplicants(job: any, company: any) {
    const applicants = await this.repo.find({ job, company });
    return applicants;
  }

  async deleteApplicant(applicantId: string, worker: any) {
    const applicant = await this.repo.deleteOne({
      _id: applicantId,
      worker,
    });

    if (!applicant) throw new NotFound("There is no Applicant here");
  }

  async workerApplicants(worker: any) {
    return await this.repo.find({ worker });
  }

  async companyApplicants(company: any) {
    return await this.repo.find({ company });
  }

  async replyApplicant(
    applicantId: string,
    company: any,
    { status }: IApplicant
  ) {
    const applicant = await this.repo.updateOne(
      { _id: applicantId, company },
      { status }
    );

    if (!applicant) throw new NotFound("There is no applicant over here");
  }

  override async create({ letter }: IApplicant, job?: any, worker?: any) {
    const jobDoc = await jobRepository.findById(job, "company");
    if (!jobDoc) throw new NotFound("there is No Job");
    const applicant = await this.repo.insertOne({
      // company: jobDoc.company,
      worker,
      job,
      letter,
    });
    return applicant;
  }
}

export default ApplicantService.getInstance<ApplicantService>();
