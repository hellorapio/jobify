import { Router } from "express";
import controller from "./job.controller";
import restrictTo from "../../middlewares/restrict.middleware";
import protect from "../../middlewares/auth.middleware";
import applicantRouter from "../applicant/applicant.routes";

const router = Router();

// router.route("/job-stats").get(controller.getJobStats);
// router.route("/top-wanted-jobs").get(wantedJobs, getAllJobs);
router.use("/:job/applicants", applicantRouter);

router
  .route("/")
  .get(controller.getAll)
  .post(protect, restrictTo("company"), controller.create);

router.route("/:slug").get(controller.get);

router
  .route("/:slug")
  .all(protect, restrictTo("company"))
  .patch(controller.update)
  .delete(controller.delete);

export default router;
