import BaseService from "../../bases/base.service";
import jobRepository from "./job.repository";
import { IJob } from "./model/job.interface";

class JobService extends BaseService<IJob, typeof jobRepository> {
  constructor() {
    super(jobRepository);
  }

  async getJobStats() {
    const job = this.repo.aggregate([
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

export default JobService.getInstance();
