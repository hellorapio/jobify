import { Router } from "express";
import controller from "./job.controller";
import restrictTo from "../../middlewares/restrict.middleware";
import protect from "../../middlewares/auth.middleware";
import applicantRouter from "../applicant/applicant.routes";
import JobMiddleware from "./job.middleware";

const router = Router();

router
  .route("/top-wanted-jobs")
  .get(JobMiddleware.wantedJobs, controller.getAll);

router.use("/:slug/applicants", applicantRouter);

router
  .route("/")
  .get(controller.getAll)
  .post(protect, restrictTo("company"), controller.create);

router.get("/within", JobMiddleware.JobsWithIn, controller.jobsWithin);

router.route("/:slug").get(controller.get);

router
  .route("/:slug")
  .all(protect, restrictTo("company"))
  .patch(controller.update)
  .delete(controller.delete);

export default router;
