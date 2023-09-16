import { Response } from "express";
import AppError from "../../utils/appError";
import sendRes from "../../utils/sendRes";
import ApplicantService from "./applicant.service";
import applicantValidator from "./applicant.validator";
import validationCatch from "../../utils/validationCatch";
import { CustomRequest } from "../../types";

const createApplicant = async (req: CustomRequest, res: Response) => {
  const { jobId } = await validationCatch(
    applicantValidator.ids,
    req.params
  );

  const applicantBody = await validationCatch(
    applicantValidator.createApplicant,
    req.params
  );

  const applicant = await ApplicantService.createApplicant(
    jobId,
    req.user.id,
    applicantBody
  );

  sendRes(res, 201, applicant);
};

const replyApplicant = async (req: CustomRequest, res: Response) => {
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

const allUserApplicants = async (req: CustomRequest, res: Response) => {
  let applicants: any[];

  if (req.user.role === "worker")
    applicants = await Applicant.find({ userId: req.user.id });
  else if (req.user.role === "company")
    applicants = await Applicant.find({ companyId: req.user.id });
  else applicants = [];

  res.status(200).json({
    status: "Success",
    results: applicants.length,
    data: applicants,
  });
};

const deleteApplicant = async (req: CustomRequest, res: Response) => {
  let applicant;

  if (req.user.role === "worker")
    applicant = await Applicant.findOneAndDelete({
      _id: req.params.applicantId,
      userId: req.user.id,
    });
  else
    applicant = await Applicant.findOneAndDelete({
      _id: req.params.applicantId,
    });

  if (!applicant) throw new AppError("There is no Applicant here", 404);

  res.status(204).json({
    status: "Success",
  });
};

const getAllApplicants = async (req: CustomRequest, res: Response) => {
  const applicants = await Applicant.find();

  res.status(200).json({
    status: "Success",
    results: applicants.length,
    data: applicants,
  });
};

const getJobApplicants = async (req: CustomRequest, res: Response) => {
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

const updateApplicant = async (req: CustomRequest, res: Response) => {
  const { letter } = req.body;
  const { applicantId } = req.params;
  const applicant = await Applicant.findOneAndUpdate(
    {
      _id: applicantId,
      userId: req.user.id,
    },
    { letter }
  );

  if (!applicant) throw new AppError("There is no applicant", 404);

  res.status(200).json({
    status: "Success",
  });
};

const getApplicant = async (req: CustomRequest, res: Response) => {
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
    req.user.id !== applicant.userId.toString()
  )
    throw new AppError("there is no applicant here", 404);

  res.status(200).json({
    status: "Success",
    applicant,
  });
};

// Admin Controllers
// s.getUserApplicants = async (req: CustomRequest, res: Response) => {});
// s.getCompanyApplicants = async (req: CustomRequest, res: Response) => {});

export default {
  updateApplicant,
  getApplicant,
  getJobApplicants,
  getAllApplicants,
  deleteApplicant,
  allUserApplicants,
  replyApplicant,
  createApplicant,
};
