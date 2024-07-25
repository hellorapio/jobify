import BaseService from "../../bases/base.service";
import NotFound from "../../errors/notFound";
import jobRepository from "../job/job.repository";
import notificationEmitter from "../notification/notification.emitter";
import notificationService from "../notification/notification.service";
import applicantRepository from "./applicant.repository";
import { IApplicant } from "./model/applicant.interface";

class ApplicantService extends BaseService<
  IApplicant,
  typeof applicantRepository
> {
  constructor() {
    super(applicantRepository);
  }

  async updateApplicant(job: any, letter: string, jobSeeker: any) {
    const applicant = await this.repo.updateOne(
      {
        job,
        jobSeeker,
      },
      { letter }
    );

    if (!applicant) throw new NotFound("There is no applicant");
  }

  async deleteApplicant(job: any, jobSeeker: any) {
    const applicant = await this.repo.deleteOne({
      jobSeeker,
      job,
    });

    if (!applicant) throw new NotFound("There is no Applicant here");
  }

  override async getAll(company?: string, job?: string, query?: any) {
    query = query || {};
    query.company = company;
    query.job = job;
    return await this.repo.find(query);
  }

  async replyApplicant(id: string, company: any, status: string) {
    const applicant = await this.repo.updateOne(
      { _id: id, company },
      { status }
    );

    if (!applicant) throw new NotFound("There is no applicant over here");

    const notification = await notificationService.create({
      user: applicant.jobSeeker,
      read: false,
      content:
        status === "Rejected"
          ? "Your Application has been Rejected"
          : status === "Accepted"
          ? "Your Application has been Accepted"
          : "Your Application is in Interviewing Stage",
    });

    notificationEmitter.publishNotification(notification);
  }

  override async create(
    { letter }: IApplicant,
    slug?: any,
    jobSeeker?: any
  ) {
    const job = await jobRepository.findOne(
      { slug, isActive: true },
      "company"
    );

    if (!job) throw new NotFound("there is No Job");

    const applicant = await this.repo.insertOne({
      company: job.company,
      jobSeeker,
      job: slug,
      letter,
    });

    const notification = await notificationService.create({
      user: job.company,
      read: false,
      content: "You have a new Applicant for your Job",
    });

    notificationEmitter.publishNotification(notification);

    return applicant;
  }

  async getUserApplicants(id: string, role: string, query?: any) {
    if (role === "job seeker") {
      query = query || {};
      query.jobSeeker = id;
      return await this.repo.find(query);
    } else {
      query = query || {};
      query.company = id;
      return await this.repo.find(query);
    }
  }
}

export default ApplicantService.getInstance<ApplicantService>();
