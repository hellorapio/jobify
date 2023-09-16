//@ts-nocheck
import catchAsync from "../../utils/catchAsync";
import AppError from "../../utils/appError";

const createApplicant = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId).select("companyId");
  if (!job) return next(new AppError("there is No Job", 404));

  const duplicate = await Applicant.find({
    userId: req.user.id,
    jobId,
  });

  if (duplicate.length)
    return next(new AppError("You have Applied to this Job already", 400));

  const applicant = await Applicant.create({
    userId: req.user.id,
    jobId,
    companyId: job.companyId,
    letter: req.body.letter,
  });

  res.status(201).json({
    status: "Success",
    applicant,
  });
});

const replyApplicant = catchAsync(async (req, res, next) => {
  const applicant = await Applicant.findOneAndUpdate(
    { _id: req.params.applicantId, companyId: req.user.id },
    { status: req.body.status },
    {
      runValidators: true,
    }
  );

  if (!applicant)
    return next(new AppError("There is no applicant over here", 404));
  res.status(200).json({
    status: "Success",
  });
});

const allUserApplicants = catchAsync(async (req, res, next) => {
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

const deleteApplicant = catchAsync(async (req, res, next) => {
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

  if (!applicant)
    return next(new AppError("There is no Applicant here", 404));

  res.status(204).json({
    status: "Success",
  });
});

const getAllApplicants = catchAsync(async (req, res, next) => {
  const applicants = await Applicant.find();

  res.status(200).json({
    status: "Success",
    results: applicants.length,
    data: applicants,
  });
});

const getJobApplicants = catchAsync(async (req, res, next) => {
  const { jobId } = req.params;
  const applicants = await Applicant.find({ jobId });

  if (applicants.length == 0)
    return next(new AppError("There is no Applicants on this Job", 404));

  if (
    req.user.role === "company" &&
    req.user.id !== applicants[0].companyId!.toString()
  )
    return next(
      new AppError(
        "You are not authorized to view other companies applicants",
        401
      )
    );

  res.status(200).json({
    status: "Success",
    results: applicants.length,
    data: applicants,
  });
});

const updateApplicant = catchAsync(async (req, res, next) => {
  const { letter } = req.body;
  const { applicantId } = req.params;
  const applicant = await Applicant.findOneAndUpdate(
    {
      _id: applicantId,
      userId: req.user.id,
    },
    { letter }
  );

  if (!applicant) return next(new AppError("There is no applicant", 404));

  res.status(200).json({
    status: "Success",
  });
});

const getApplicant = catchAsync(async (req, res, next) => {
  const { applicantId } = req.params;
  const applicant = await Applicant.findById(applicantId);

  if (!applicant)
    return next(new AppError("There is no Applicant over here", 404));

  if (
    req.user.role === "company" &&
    req.user.id !== applicant.companyId.toString()
  )
    return next(new AppError("there is no applicant here", 404));

  if (
    req.user.role === "worker" &&
    req.user.id !== applicant.userId.toString()
  )
    return next(new AppError("there is no applicant here", 404));

  res.status(200).json({
    status: "Success",
    applicant,
  });
});

// Admin Controllers
// s.getUserApplicants = catchAsync(async (req, res, next) => {});
// s.getCompanyApplicants = catchAsync(async (req, res, next) => {});

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
