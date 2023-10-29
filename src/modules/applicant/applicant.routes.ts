import { Router } from "express";
import controller from "./applicant.controller";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";

const router = Router({ mergeParams: true });

// Add Notifications on these for workers
router
  .route("/reply/:applicantId")
  .all(protect)
  .patch(restrictTo("company"), controller.replyApplicant);

// Implement Logic to get User or Company Applicants

// Implement Logic to gather data about applicants for users or companies

router
  .route("/")
  .all(protect)
  .get(restrictTo("company"), controller.getAll)
  .post(restrictTo("worker"), controller.create)
  .patch(restrictTo("worker"), controller.updateApplicant)
  .delete(restrictTo("worker"), controller.deleteApplicant);

export default router;
