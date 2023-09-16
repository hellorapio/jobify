//@ts-nocheck
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";
import sendRes from "../../utils/sendRes";
import ApplicantService from "./applicant.service";
import applicantValidator from "./applicant.validator";
import validationCatch from "../../utils/validationCatch";

const createApplicant = catchAsync(async (req, res) => {
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
    applicantBody
  );

  sendRes(res, 201, applicant);
});

const replyApplicant = catchAsync(async (req, res) => {
  const { applicantId } = await validationCatch(
    applicantValidator.ids,
    req.params
  );

  const status = await validationCatch(
    applicantValidator.updateApplicantStatus,
    req.body
  );

  await ApplicantService.replyApplicant(
    allUserApplicants,
    req.user.id,
    status
  );

  sendRes(res, 200);
});

const allUserApplicants = catchAsync(async (req, res) => {
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
});

const deleteApplicant = catchAsync(async (req, res) => {
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
});

const getAllApplicants = catchAsync(async (req, res) => {
  const applicants = await Applicant.find();

  res.status(200).json({
    status: "Success",
    results: applicants.length,
    data: applicants,
  });
});

const getJobApplicants = catchAsync(async (req, res) => {
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
});

const updateApplicant = catchAsync(async (req, res) => {
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
});

const getApplicant = catchAsync(async (req, res) => {
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
});

// Admin Controllers
// s.getUserApplicants = catchAsync(async (req, res) => {});
// s.getCompanyApplicants = catchAsync(async (req, res) => {});

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
