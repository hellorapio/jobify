import AppError from "../../errors/baseError";
import Job, { IJob } from "./job.model";

class JobService {
  static async createJob(jobBody: IJob) {
    return await Job.create(jobBody);
  }

  static async updateJob(id: string, jobBody: IJob) {
    const job = await Job.findByIdAndUpdate(id, jobBody, {
      new: true,
      runValidators: true,
    });
    if (!job) throw new AppError("Error 404 Job Isn't Found", 404);
    return job;
  }

  static async getJob(id: string) {
    const job = await Job.findById(id);
    if (!job) throw new AppError("Error 404 Job Isn't Found", 404);
    return job;
  }

  static async deleteJob(id: string) {
    const job = await Job.findByIdAndDelete(id);
    if (!job) throw new AppError("Error 404 Job Isn't Found", 404);
    return job;
  }

  static async getAllJobs() {
    const jobs = await Job.find();
    return jobs;
  }
}

export default JobService;
