import catchAsync from "../../utils/catchAsync";
import validationCatch from "../../utils/validationCatch";
import jobValidator from "./job.validator";
import sendRes from "../../utils/sendRes";
import validators from "../../utils/validators";
import JobService from "./job.service";

const getAllJobs = catchAsync(async (req, res) => {
  const jobs = await JobService.getAllJobs();
  sendRes(res, 200, { results: jobs.length, jobs });
});

const getJob = catchAsync(async (req, res) => {
  const { id } = await validationCatch(validators.mongoId, req.params);
  const job = await JobService.getJob(id);
  sendRes(res, 200, job);
});

const createJob = catchAsync(async (req, res) => {
  const jobBody = await validationCatch(jobValidator.createJob, req.body);
  const job = await JobService.createJob(jobBody);
  sendRes(res, 201, job);
});

const updateJob = catchAsync(async (req, res) => {
  const jobBody = await validationCatch(jobValidator.updateJob, req.body);
  const { id } = await validationCatch(validators.mongoId, req.params);
  const job = await JobService.updateJob(id, jobBody);
  sendRes(res, 200, job);
});

const deleteJob = catchAsync(async (req, res) => {
  const { id } = await validationCatch(validators.mongoId, req.params);
  await JobService.deleteJob(id);
  sendRes(res, 204);
});

export default { updateJob, getAllJobs, deleteJob, createJob, getJob };

// export const getJobStats = catchAsync(async (req, res, next) => {
//   const job = await Job.aggregate([
//     {
//       $group: {
//         _id: "$education_level",
//         totalSalary: { $sum: "$salary.value" },
//         minSalary: { $min: "$salary.value" },
//         maxSalary: { $max: "$salary.value" },
//         avgSalary: { $avg: "$salary.value" },
//         count: { $sum: 1 },
//       },
//     },
//     {
//       $sort: { count: -1 },
//     },
//   ]);

//   res.status(200).json({
//     status: "Success",
//     data: job,
//   });
// });

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
