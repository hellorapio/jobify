import { Response, Request } from "express";
import sendRes from "../../utils/sendResponse";
import applicantService from "./applicant.service";
import applicantValidator from "./applicant.validator";
import BaseController from "../../bases/base.controller";
import { IApplicant } from "./model/applicant.interface";

class ApplicantController extends BaseController<
  IApplicant,
  typeof applicantService,
  typeof applicantValidator
> {
  constructor() {
    super(applicantService, applicantValidator);
  }

  override async create(req: Request, res: Response) {
    const { jobId } = await this.validator.ids(req.params);
    const body = await this.validator.create(req.body);
    const applicant = await this.service.create(
      jobId,
      req.user.id,
      body
    );
    sendRes(res, 201, applicant);
  }

  async replyApplicant(req: Request, res: Response) {
    const { applicantId } = await this.validator.ids(req.params);
    const status = await this.validator.updateApplicantStatus(req.body);
    await this.service.replyApplicant(applicantId, req.user.id, status);

    sendRes(res, 200);
  }

  async workerApplicants(req: Request, res: Response) {
    const applicants = await this.service.workerApplicants(req.user.id);
    sendRes(res, 200, { results: applicants.length, applicants });
  }

  async companyApplicants(req: Request, res: Response) {
    const applicants = await this.service.workerApplicants(req.user.id);
    sendRes(res, 200, { results: applicants.length, applicants });
  }

  async deleteApplicant(req: Request, res: Response) {
    const { applicantId } = await this.validator.ids(req.params);
    await this.service.deleteApplicant(applicantId, req.user.id);
    sendRes(res, 204);
  }

  async getJobApplicants(req: Request, res: Response) {
    const { jobId } = await this.validator.ids(req.params);
    const applicants = await this.service.getJobApplicants(
      jobId,
      req.user.id
    );
    sendRes(res, 200, { results: applicants.length, applicants });
  }

  async updateApplicant(req: Request, res: Response) {
    const { letter } = await this.validator.updateApplicantLetter(
      req.body
    );
    const { applicantId } = await this.validator.ids(req.params);

    await this.service.updateApplicant(applicantId, req.user.id, letter);
    sendRes(res, 200);
  }

  async getApplicant(req: Request, res: Response) {
    const { applicantId } = await this.validator.ids(req.params);
    const applicant = await this.service.getApplicant(
      applicantId,
      req.user.id
    );

    sendRes(res, 200, applicant);
  }
}

export default ApplicantController.getInstance();
