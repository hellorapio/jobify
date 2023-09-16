import { Response, Request } from "express";
import AppError from "../../utils/appError";
import sendRes from "../../utils/sendRes";
import ApplicantService from "./applicant.service";
import applicantValidator from "./applicant.validator";
import validationCatch from "../../utils/validationCatch";

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
  const { jobId } = req.params;
  const applicants = await Applicant.find({ jobId });

  if (applicants.length == 0)
    throw new AppError("There is no Applicants on this Job", 404);

  if (
    req.user.role === "company" &&
    req.user.id !== applicants[0].companyId!.toString()
  )
    throw new AppError(
      "You are not authorized to view other companies applicants",
      401
    );

  res.status(200).json({
    status: "Success",
    results: applicants.length,
    data: applicants,
  });
};

const updateApplicant = async (req: Request, res: Response) => {
  const { letter } = req.body;
  const { applicantId } = req.params;
  const applicant = await Applicant.findOneAndUpdate(
    {
      _id: applicantId,
      workerId: req.user.id,
    },
    { letter }
  );

  if (!applicant) throw new AppError("There is no applicant", 404);

  res.status(200).json({
    status: "Success",
  });
};

const getApplicant = async (req: Request, res: Response) => {
  const { applicantId } = req.params;
  const applicant = await Applicant.findById(applicantId);

  if (!applicant) throw new AppError("There is no Applicant here", 404);

  if (
    req.user.role === "company" &&
    req.user.id !== applicant.companyId.toString()
  )
    throw new AppError("there is no applicant here", 404);

  if (
    req.user.role === "worker" &&
    req.user.id !== applicant.workerId.toString()
  )
    throw new AppError("there is no applicant here", 404);

  res.status(200).json({
    status: "Success",
    applicant,
  });
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
