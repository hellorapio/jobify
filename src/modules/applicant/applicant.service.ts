import AppError from "../../errors/baseError";
import Job from "../job/model/job.model";
import { IApplicant } from "./model/applicant.interface";
import Applicant from "./model/applicant.model";

class ApplicantService {
  static async updateApplicant(
    applicantId: string,
    workerId: string,
    letter: string
  ) {
    const applicant = await Applicant.findOneAndUpdate(
      {
        _id: applicantId,
        workerId,
      },
      { letter }
    );

    if (!applicant) throw new AppError("There is no applicant", 404);
  }

  static async getApplicant(applicantId: string, workerId: string) {
    const applicant = await Applicant.findOne({
      _id: applicantId,
      workerId,
    });

    if (!applicant) throw new AppError("There is no Applicant here", 404);

    return applicant;
  }

  static async getJobApplicants(jobId: string, companyId: string) {
    const applicants = await Applicant.find({ jobId, companyId });
    return applicants;
  }

  static async deleteApplicant(applicantId: string, workerId: string) {
    const applicant = await Applicant.findOneAndDelete({
      _id: applicantId,
      workerId,
    });

    if (!applicant) throw new AppError("There is no Applicant here", 404);
  }

  static async workerApplicants(workerId: string) {
    return await Applicant.find({ workerId });
  }

  static async companyApplicants(companyId: string) {
    return await Applicant.find({ companyId });
  }

  static async replyApplicant(
    applicantId: string,
    companyId: string,
    { status }: IApplicant
  ) {
    const applicant = await Applicant.findOneAndUpdate(
      { _id: applicantId, companyId },
      { status },
      {
        runValidators: true,
      }
    );

    if (!applicant)
      throw new AppError("There is no applicant over here", 404);
  }

  static async createApplicant(
    jobId: string,
    workerId: string,
    { letter }: IApplicant
  ) {
    const job = await Job.findById(jobId).select("companyId");
    if (!job) throw new AppError("there is No Job", 404);

    const duplicate = await Applicant.find({
      workerId,
      jobId,
    });

    if (duplicate)
      throw new AppError("You have Applied to this Job already", 400);

    const applicant = await Applicant.create({
      companyId: job.companyId,
      workerId,
      jobId,
      letter,
    });
    return applicant;
  }
}

export default ApplicantService;
