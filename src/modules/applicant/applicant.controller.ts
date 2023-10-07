import { Response, Request } from "express";
import sendRes from "../../utils/sendResponse";
import ApplicantService from "./applicant.service";
import applicantValidator from "./applicant.joi";
import validationCatch from "../../utils/validCatch";

class ApplicantController {
  static async createApplicant(req: Request, res: Response) {
    const { jobId } = await validationCatch(
      applicantValidator.ids,
      req.params
    );

    const applicantBody = await validationCatch(
      applicantValidator.createApplicant,
      req.body
    );

    const applicant = await ApplicantService.createApplicant(
      jobId,
      req.user.id,
      applicantBody
    );

    sendRes(res, 201, applicant);
  }

  static async replyApplicant(req: Request, res: Response) {
    const { applicantId } = await validationCatch(
      applicantValidator.ids,
      req.params
    );

    const status = await validationCatch(
      applicantValidator.updateApplicantStatus,
      req.body
    );

    await ApplicantService.replyApplicant(
      applicantId,
      req.user.id,
      status
    );

    sendRes(res, 200);
  }

  static async workerApplicants(req: Request, res: Response) {
    const applicants = await ApplicantService.workerApplicants(
      req.user.id
    );
    sendRes(res, 200, { results: applicants.length, applicants });
  }

  static async companyApplicants(req: Request, res: Response) {
    const applicants = await ApplicantService.workerApplicants(
      req.user.id
    );
    sendRes(res, 200, { results: applicants.length, applicants });
  }

  static async deleteApplicant(req: Request, res: Response) {
    const { applicantId } = await validationCatch(
      applicantValidator.ids,
      req.params
    );

    await ApplicantService.deleteApplicant(applicantId, req.user.id);
    sendRes(res, 204);
  }

  static async getJobApplicants(req: Request, res: Response) {
    const { jobId } = await validationCatch(
      applicantValidator.ids,
      req.params
    );
    const applicants = await ApplicantService.getJobApplicants(
      jobId,
      req.user.id
    );
    sendRes(res, 200, { results: applicants.length, applicants });
  }

  static async updateApplicant(req: Request, res: Response) {
    const { letter } = await validationCatch(
      applicantValidator.updateApplicantLetter,
      req.body
    );
    const { applicantId } = await validationCatch(
      applicantValidator.ids,
      req.params
    );
    await ApplicantService.updateApplicant(
      applicantId,
      req.user.id,
      letter
    );
    sendRes(res, 200);
  }

  static async getApplicant(req: Request, res: Response) {
    const { applicantId } = await validationCatch(
      applicantValidator.ids,
      req.params
    );
    const applicant = await ApplicantService.getApplicant(
      applicantId,
      req.user.id
    );

    sendRes(res, 200, applicant);
  }
}

export default ApplicantController;
