//@ts-nocheck
import express from "express";
const router = express.Router();

import {
  getAllJobs,
  getJob,
  getJobStats,
  createJob,
  updateJob,
  deleteJob,
  wantedJobs,
} from "./job.controller";

import { restrictTo, authProtection } from "../middlewares/auth";

router.route("/job-stats").get(getJobStats);

router.route("/top-wanted-jobs").get(wantedJobs, getAllJobs);

router
  .route("/")
  .get(getAllJobs)
  .post(authProtection, restrictTo("company", "admin"), createJob);

router
  .route("/:id")
  .get(getJob)
  .patch(updateJob)
  .delete(authProtection, restrictTo("admin"), deleteJob);

export default router;
