import { Response, Request } from "express";
import sendRes from "../../utils/sendResponse";
import ApplicantService from "./applicant.service";
import applicantValidator from "./applicant.validator";
import validationCatch from "../../utils/validCatch";

const createApplicant = async (req: Request, res: Response) => {
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
};

const replyApplicant = async (req: Request, res: Response) => {
  const { applicantId } = await validationCatch(
    applicantValidator.ids,
    req.params
  );

  const status = await validationCatch(
    applicantValidator.updateApplicantStatus,
    req.body
  );

  await ApplicantService.replyApplicant(applicantId, req.user.id, status);

  sendRes(res, 200);
};

const workerApplicants = async (req: Request, res: Response) => {
  const applicants = await ApplicantService.workerApplicants(req.user.id);
  sendRes(res, 200, { results: applicants.length, applicants });
};

const companyApplicants = async (req: Request, res: Response) => {
  const applicants = await ApplicantService.workerApplicants(req.user.id);
  sendRes(res, 200, { results: applicants.length, applicants });
};

const deleteApplicant = async (req: Request, res: Response) => {
  const { applicantId } = await validationCatch(
    applicantValidator.ids,
    req.params
  );

  await ApplicantService.deleteApplicant(applicantId, req.user.id);
  sendRes(res, 204);
};

const getJobApplicants = async (req: Request, res: Response) => {
  const { jobId } = await validationCatch(
    applicantValidator.ids,
    req.params
  );
  const applicants = await ApplicantService.getJobApplicants(
    jobId,
    req.user.id
  );
  sendRes(res, 200, { results: applicants.length, applicants });
};

const updateApplicant = async (req: Request, res: Response) => {
  const { letter } = await validationCatch(
    applicantValidator.updateApplicantLetter,
    req.body
  );
  const { applicantId } = await validationCatch(
    applicantValidator.ids,
    req.params
  );
  await ApplicantService.updateApplicant(applicantId, req.user.id, letter);
  sendRes(res, 200);
};

const getApplicant = async (req: Request, res: Response) => {
  const { applicantId } = await validationCatch(
    applicantValidator.ids,
    req.params
  );
  const applicant = await ApplicantService.getApplicant(
    applicantId,
    req.user.id
  );

  sendRes(res, 200, applicant);
};

export default {
  updateApplicant,
  getApplicant,
  getJobApplicants,
  deleteApplicant,
  workerApplicants,
  companyApplicants,
  replyApplicant,
  createApplicant,
};
