import { Router } from "express";
import applicantController from "./applicant.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router
  .route("/reply/:applicantId")
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo("company"),
    applicantController.replyApplicant
  );

router
  .route("/:jobId")
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo("worker", "admin"),
    applicantController.createApplicant
  )
  .get(
    authMiddleware.protect,
    authMiddleware.restrictTo("company", "admin"),
    applicantController.getJobApplicants
  );

router
  .route("/search/:applicantId")
  .delete(
    authMiddleware.protect,
    authMiddleware.restrictTo("worker", "admin"),
    applicantController.deleteApplicant
  )
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo("worker"),
    applicantController.updateApplicant
  )
  .get(authMiddleware.protect, applicantController.getApplicant);

export default router;
