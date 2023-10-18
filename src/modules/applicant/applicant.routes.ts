import { Router } from "express";
import controller from "./applicant.controller";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";

const router = Router();

router
  .route("/reply/:applicantId")
  .all(protect)
  .patch(restrictTo("company"), controller.replyApplicant);

router
  .route("/:jobId")
  .all(protect)
  .post(restrictTo("worker"), controller.createApplicant)
  .get(restrictTo("company"), controller.getJobApplicants);

router
  .route("/search/:applicantId")
  .all(protect)
  .get(controller.getApplicant)
  .delete(restrictTo("worker"), controller.deleteApplicant)
  .patch(restrictTo("worker"), controller.updateApplicant);

export default router;
