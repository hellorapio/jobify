import { Router } from "express";

import JobController from "./job.controller";
import restrictTo from "../../middlewares/restrict.middleware";
import protect from "../../middlewares/auth.middleware";
const router = Router();

router.route("/job-stats").get(JobController.getJobStats);
// router.route("/top-wanted-jobs").get(wantedJobs, getAllJobs);

router
  .route("/")
  .get(JobController.getAllJobs)
  .post(protect, restrictTo("company"), JobController.createJob);

router
  .route("/:id")
  .get(JobController.getJob)
  .patch(JobController.updateJob)
  .delete(protect, restrictTo(), JobController.deleteJob);

export default router;
