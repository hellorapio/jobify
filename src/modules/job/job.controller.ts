import sendRes from "../../utils/sendResponse";
import JobValidator from "./job.validator";
import JobService from "./job.service";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";

class JobController {
  static async getAllJobs(_: Request, res: Response) {
    const jobs = await JobService.getAllJobs();
    sendRes(res, 200, { results: jobs.length, jobs });
  }

  static async getJob(req: Request, res: Response) {
    const { id } = await JobValidator.jobId(req.params);
    const job = await JobService.getJob(id);
    sendRes(res, 200, job);
  }

  static async createJob(req: Request, res: Response) {
    const jobBody = await JobValidator.createJob(req.body);
    const job = await JobService.createJob(jobBody);
    sendRes(res, 201, job);
  }

  static async updateJob(req: Request, res: Response) {
    const jobBody = await JobValidator.updateJob(req.body);
    const { id } = await JobValidator.jobId(req.params);
    const job = await JobService.updateJob(id, jobBody);
    sendRes(res, 200, job);
  }

  static async deleteJob(req: Request, res: Response) {
    const { id } = await JobValidator.jobId(req.params);
    await JobService.deleteJob(id);
    sendRes(res, 204);
  }

  static async getJobStats(_: Request, res: Response) {
    const job = await JobService.getJobStats();
    sendResponse(res, 200, job);
  }
}

export default JobController;

// export const wantedJobs = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   req.query.limit = "5";
//   req.query.fields = "title,salary.value";
//   req.query.sort = "-salary.value";
//   next();
// };
