//@ts-nocheck
import express from "express";
const router = express.Router();

import jobController from "./job.controller";

import authMiddleware from "../../middlewares/auth.middleware";

// router.route("/job-stats").get(getJobStats);

// router.route("/top-wanted-jobs").get(wantedJobs, getAllJobs);

router
  .route("/")
  .get(jobController.getAllJobs)
  .post(
    authMiddleware.authProtection,
    authMiddleware.restrictTo("company", "admin"),
    jobController.createJob
  );

router
  .route("/:id")
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(
    authMiddleware.authProtection,
    authMiddleware.restrictTo("admin"),
    jobController.deleteJob
  );

export default router;
