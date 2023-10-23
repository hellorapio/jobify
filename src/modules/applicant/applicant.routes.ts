import { Router } from "express";
import controller from "./applicant.controller";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";

const router = Router({ mergeParams: true });

router
  .route("/reply/:applicantId")
  .all(protect)
  .patch(restrictTo("company"), controller.replyApplicant);

router
  .route("/search/:applicantId")
  .all(protect)
  .get(controller.getApplicant)
  .delete(restrictTo("worker"), controller.deleteApplicant)
  .patch(restrictTo("worker"), controller.updateApplicant);

router
  .route("/")
  .all(protect)
  .post(restrictTo("worker"), controller.create)
  .get(restrictTo("company"), controller.getAll);

export default router;
