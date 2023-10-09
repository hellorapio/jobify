import { Router } from "express";
import applicantController from "./applicant.controller";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";

const router = Router();

router
  .route("/reply/:applicantId")
  .all(protect)
  .patch(restrictTo("company"), applicantController.replyApplicant);

router
  .route("/:jobId")
  .all(protect)
  .post(restrictTo("worker"), applicantController.createApplicant)
  .get(restrictTo("company"), applicantController.getJobApplicants);

router
  .route("/search/:applicantId")
  .all(protect)
  .get(applicantController.getApplicant)
  .delete(restrictTo("worker"), applicantController.deleteApplicant)
  .patch(restrictTo("worker"), applicantController.updateApplicant);

export default router;
