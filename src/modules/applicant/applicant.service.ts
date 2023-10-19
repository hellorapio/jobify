import BaseService from "../../bases/base.service";
import BadRequest from "../../errors/badRequest";
import NotFound from "../../errors/notFound";
import jobRepository from "../job/job.repository";
import applicantRepository from "./applicant.repository";
import { IApplicant } from "./model/applicant.interface";

class ApplicantService extends BaseService<IApplicant> {
  constructor() {
    super(applicantRepository);
  }

  async updateApplicant(
    applicantId: string,
    workerId: any,
    letter: string
  ) {
    const applicant = await this.repo.updateOne(
      {
        _id: applicantId,
        workerId,
      },
      { letter }
    );

    if (!applicant) throw new NotFound("There is no applicant");
  }

  async getApplicant(applicantId: string, workerId: any) {
    const applicant = await this.repo.findOne({
      _id: applicantId,
      workerId,
    });

    if (!applicant) throw new NotFound("There is no Applicant here");

    return applicant;
  }

  async getJobApplicants(jobId: any, companyId: any) {
    const applicants = await this.repo.find({ jobId, companyId });
    return applicants;
  }

  async deleteApplicant(applicantId: string, workerId: any) {
    const applicant = await this.repo.deleteOne({
      _id: applicantId,
      workerId,
    });

    if (!applicant) throw new NotFound("There is no Applicant here");
  }

  async workerApplicants(workerId: any) {
    return await this.repo.find({ workerId });
  }

  async companyApplicants(companyId: any) {
    return await this.repo.find({ companyId });
  }

  async replyApplicant(
    applicantId: string,
    companyId: any,
    { status }: IApplicant
  ) {
    const applicant = await this.repo.updateOne(
      { _id: applicantId, companyId },
      { status }
    );

    if (!applicant) throw new NotFound("There is no applicant over here");
  }

  //@ts-ignore
  override async create(
    jobId: any,
    workerId: any,
    { letter }: IApplicant
  ) {
    const job = await jobRepository.findById(jobId).select("companyId");
    if (!job) throw new NotFound("there is No Job");

    const duplicate = await this.repo.find({
      workerId,
      jobId,
    });
    if (duplicate)
      throw new BadRequest("You have Applied to this Job already");

    const applicant = await this.repo.insertOne({
      companyId: job.companyId,
      workerId,
      jobId,
      letter,
    });
    return applicant;
  }
}

export default ApplicantService.getInstance();
