import express from "express";

import applicantController from "./applicant.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = express.Router();

router
  .route("/reply/:applicantId")
  .patch(
    authMiddleware.authProtection,
    authMiddleware.restrictTo("company"),
    applicantController.replyApplicant
  );

router
  .route("/:jobId")
  .post(
    authMiddleware.authProtection,
    authMiddleware.restrictTo("worker", "admin"),
    applicantController.createApplicant
  )
  .get(
    authMiddleware.authProtection,
    authMiddleware.restrictTo("company", "admin"),
    applicantController.getJobApplicants
  );

router
  .route("/search/:applicantId")
  .delete(
    authMiddleware.authProtection,
    authMiddleware.restrictTo("worker", "admin"),
    applicantController.deleteApplicant
  )
  .patch(
    authMiddleware.authProtection,
    authMiddleware.restrictTo("worker"),
    applicantController.updateApplicant
  )
  .get(authMiddleware.authProtection, applicantController.getApplicant);

export default router;
