import { Router } from "express";
import controller from "./applicant.controller";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";

const applicantJobsrouter = Router({ mergeParams: true });

// Add Notifications on these for Job Seekers

applicantJobsrouter
  .route("/reply/:applicantId")
  .all(protect)
  .patch(restrictTo("company"), controller.replyApplicant);

applicantJobsrouter
  .route("/")
  .all(protect)
  .get(restrictTo("company"), controller.getAll)
  .post(restrictTo("job seeker"), controller.create)
  .patch(restrictTo("job seeker"), controller.updateApplicant)
  .delete(restrictTo("job seeker"), controller.deleteApplicant);

export const applicantRouter = Router();

applicantRouter
  .route("/me")
  .all(protect)
  .get(controller.currentUserApplicants);

export default applicantJobsrouter;
