import { Router } from "express";
import applicantController from "./applicant.controller";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";

const router = Router();

router
  .route("/reply/:applicantId")
  .patch(
    protect,
    restrictTo("company"),
    applicantController.replyApplicant
  );

router
  .route("/:jobId")
  .post(protect, restrictTo("worker"), applicantController.createApplicant)
  .get(
    protect,
    restrictTo("company"),
    applicantController.getJobApplicants
  );

router
  .route("/search/:applicantId")
  .get(protect, applicantController.getApplicant)
  .delete(
    protect,
    restrictTo("worker"),
    applicantController.deleteApplicant
  )
  .patch(
    protect,
    restrictTo("worker"),
    applicantController.updateApplicant
  );

export default router;
