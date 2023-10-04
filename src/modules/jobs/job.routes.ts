import { Router } from "express";

import jobController from "./job.controller";
import authMiddleware from "../../middlewares/auth.middleware";
const router = Router();

// router.route("/job-stats").get(getJobStats);
// router.route("/top-wanted-jobs").get(wantedJobs, getAllJobs);

router
  .route("/")
  .get(jobController.getAllJobs)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo("company", "admin"),
    jobController.createJob
  );

router
  .route("/:id")
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo("admin"),
    jobController.deleteJob
  );

export default router;
