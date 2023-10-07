import NotFound from "../../errors/notFound";
import jobRepository from "./job.repository";
import { IJob } from "./model/job.interface";

class JobService {
  static async createJob(jobBody: IJob) {
    return await jobRepository.insertOne(jobBody);
  }

  static async updateJob(id: string, jobBody: IJob) {
    const job = await jobRepository.updateOneById(id, jobBody);
    if (!job) throw new NotFound("Error 404 Job Isn't Found");
    return job;
  }

  static async getJob(id: string) {
    const job = await jobRepository.findById(id);
    if (!job) throw new NotFound("Error 404 Job Isn't Found");
    return job;
  }

  static async deleteJob(id: string) {
    const job = await jobRepository.deleteOneById(id);
    if (!job) throw new NotFound("Error 404 Job Isn't Found");
    return job;
  }

  static async getAllJobs() {
    const jobs = await jobRepository.find({});
    return jobs;
  }

  static async getJobStats() {
    const job = jobRepository.aggregate([
      {
        $group: {
          _id: "$educationLevel",
          totalSalary: { $sum: "$salary" },
          minSalary: { $min: "$salary" },
          maxSalary: { $max: "$salary" },
          avgSalary: { $avg: "$salary" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
    return job;
  }
}

export default JobService;
