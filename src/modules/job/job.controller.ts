import sendResponse from "../../utils/sendResponse";
import jobValidator from "./job.validator";
import jobService from "./job.service";
import { Request, Response } from "express";
import BaseController from "../../bases/base.controller";
import { IJob } from "./model/job.interface";

class JobController extends BaseController<IJob, typeof jobService> {
  constructor() {
    super(jobService, jobValidator);
    this.getJobStats = this.getJobStats.bind(this);
  }

  async getJobStats(_: Request, res: Response) {
    const job = await this.service.getJobStats();
    sendResponse(res, 200, job);
  }
}

export default JobController.getInstance();

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
