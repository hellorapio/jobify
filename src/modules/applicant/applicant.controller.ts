import { Response, Request } from "express";
import sendResponse from "../../utils/sendResponse";
import service from "./applicant.service";
import validator from "./applicant.validator";
import BaseController from "../../bases/base.controller";
import { IApplicant } from "./model/applicant.interface";

class ApplicantController extends BaseController<
  IApplicant,
  typeof service,
  typeof validator
> {
  constructor() {
    super(service, validator);
  }

  override async create(req: Request, res: Response) {
    const { job } = await this.validator.ids(req.params);
    const body = await this.validator.create(req.body);
    const applicant = await this.service.create(job, req.user.id, body);
    sendResponse(res, 201, applicant);
  }

  async replyApplicant(req: Request, res: Response) {
    const { applicantId } = await this.validator.ids(req.params);
    const status = await this.validator.updateStatus(req.body);
    await this.service.replyApplicant(applicantId, req.user.id, status);
    sendResponse(res, 200);
  }

  async workerApplicants(req: Request, res: Response) {
    const applicants = await this.service.workerApplicants(req.user.id);
    sendResponse(res, 200, { results: applicants.length, applicants });
  }

  async companyApplicants(req: Request, res: Response) {
    const applicants = await this.service.workerApplicants(req.user.id);
    sendResponse(res, 200, { results: applicants.length, applicants });
  }

  async deleteApplicant(req: Request, res: Response) {
    const { applicantId } = await this.validator.ids(req.params);
    await this.service.deleteApplicant(applicantId, req.user.id);
    sendResponse(res, 204);
  }

  async getJobApplicants(req: Request, res: Response) {
    const { job } = await this.validator.ids(req.params);
    const applicants = await this.service.getJobApplicants(
      job,
      req.user.id
    );
    sendResponse(res, 200, { results: applicants.length, applicants });
  }

  async updateApplicant(req: Request, res: Response) {
    const { letter } = await this.validator.updateLetter(req.body);
    const { applicantId } = await this.validator.ids(req.params);
    await this.service.updateApplicant(applicantId, req.user.id, letter);
    sendResponse(res, 200);
  }

  async getApplicant(req: Request, res: Response) {
    const { applicantId } = await this.validator.ids(req.params);
    const applicant = await this.service.getApplicant(
      applicantId,
      req.user.id
    );

    sendResponse(res, 200, applicant);
  }
}

export default ApplicantController.getInstance<ApplicantController>();
