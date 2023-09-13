//@ts-nocheck
import express from "express";

import {
  createApplicant,
  getAllApplicants,
  getJobApplicants,
  updateApplicant,
  getApplicant,
  allUserApplicants,
  deleteApplicant,
  replyApplicant,
} from "./applicant.controller";

import { restrictTo, authProtection } from "../middlewares/auth";

const router = express.Router();

router
  .route("/")
  .get(authProtection, restrictTo("admin"), getAllApplicants);

router
  .route("/me")
  .get(authProtection, restrictTo("worker", "company"), allUserApplicants);

router
  .route("/reply/:applicantId")
  .patch(authProtection, restrictTo("company"), replyApplicant);

router
  .route("/:jobId")
  .post(authProtection, restrictTo("worker", "admin"), createApplicant)
  .get(authProtection, restrictTo("company", "admin"), getJobApplicants);

router
  .route("/search/:applicantId")
  .delete(authProtection, restrictTo("worker", "admin"), deleteApplicant)
  .patch(authProtection, restrictTo("worker"), updateApplicant)
  .get(authProtection, getApplicant);

export default router;
