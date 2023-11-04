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
    this.deleteApplicant = this.deleteApplicant.bind(this);
    this.updateApplicant = this.updateApplicant.bind(this);
    this.replyApplicant = this.replyApplicant.bind(this);
    this.currentUserApplicants = this.currentUserApplicants.bind(this);
  }

  override async create(req: Request, res: Response) {
    const { slug } = await this.validator.ids(req.params);
    const body = await this.validator.create(req.body);
    const applicant = await this.service.create(body, slug, req.user.id);
    sendResponse(res, 201, applicant);
  }

  override async getAll(req: Request, res: Response) {
    const query = await this.validator.query(req.query);
    const { id } = req.user;
    const { slug } = await this.validator.ids(req.params);
    const applicants = await this.service.getAll(id, slug, query);
    sendResponse(res, 200, { results: applicants.length, applicants });
  }

  async deleteApplicant(req: Request, res: Response) {
    const { slug } = await this.validator.ids(req.params);
    await this.service.deleteApplicant(slug, req.user.id);
    sendResponse(res, 204);
  }

  async updateApplicant(req: Request, res: Response) {
    const { letter } = await this.validator.updateLetter(req.body);
    const { slug } = await this.validator.ids(req.params);
    await this.service.updateApplicant(slug, letter, req.user.id);
    sendResponse(res, 200);
  }

  async replyApplicant(req: Request, res: Response) {
    const { applicantId } = await this.validator.ids(req.params);
    const { status } = await this.validator.updateStatus(req.body);
    await this.service.replyApplicant(applicantId, req.user.id, status);
    sendResponse(res, 200);
  }

  async currentUserApplicants(req: Request, res: Response) {
    const { id, role } = req.user;
    const query = await this.validator.query(req.query);
    const applicants = await this.service.getUserApplicants(
      id,
      role,
      query
    );
    sendResponse(res, 200, applicants);
  }
}

export default ApplicantController.getInstance<ApplicantController>();
