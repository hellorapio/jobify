import sendResponse from "../../utils/sendResponse";
import jobValidator from "./job.validator";
import jobService from "./job.service";
import { Request, Response } from "express";
import BaseController from "../../bases/base.controller";
import { IJob } from "./model/job.interface";

class JobController extends BaseController<IJob, typeof jobService> {
  constructor() {
    super(jobService, jobValidator);
  }

  override async getAll(req: Request, res: Response) {
    const { username } = await this.validator.username(req.params);
    const jobs = await this.service.getAll(username);
    sendResponse(res, 200, { results: jobs.length, jobs });
  }

  override async update(req: Request, res: Response) {
    const { slug } = await this.validator.slug(req.params);
    const body = await this.validator.update(req.body);
    const job = await this.service.update(slug, body, req.user.id);
    sendResponse(res, 200, job);
  }

  override async get(req: Request, res: Response) {
    const { slug } = await this.validator.slug(req.params);
    const job = await this.service.get(slug);
    sendResponse(res, 200, job);
  }

  override async delete(req: Request, res: Response) {
    const { slug } = await this.validator.slug(req.params);
    await this.service.delete(slug, req.user.id);
    sendResponse(res, 204);
  }

  override async create(req: Request, res: Response) {
    const body = await this.validator.create(req.body);
    const job = await this.service.create(body, req.user.id);
    sendResponse(res, 201, job);
  }
}

export default JobController.getInstance<JobController>();

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
