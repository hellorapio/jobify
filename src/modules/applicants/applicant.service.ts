import AppError from "../../utils/appError";
import Job from "../jobs/job.model";
import Applicant, { IApplicant } from "./applicant.model";

class ApplicantService {
  static async updateApplicant() {}

  static async getApplicant() {}

  static async getJobApplicants() {}

  static async getAllApplicants() {}

  static async deleteApplicant() {}

  static async allUserApplicants() {}

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
    userId: string,
    { letter }: IApplicant
  ) {
    const job = await Job.findById(jobId).select("companyId");
    if (!job) throw new AppError("there is No Job", 404);

    const duplicate = await Applicant.find({
      userId,
      jobId,
    });

    if (duplicate)
      throw new AppError("You have Applied to this Job already", 400);

    const applicant = await Applicant.create({
      companyId: job.companyId,
      userId,
      jobId,
      letter,
    });
    return applicant;
  }
}

export default ApplicantService;
