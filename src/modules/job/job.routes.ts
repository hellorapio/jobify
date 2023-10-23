import { Router } from "express";
import controller from "./job.controller";
import restrictTo from "../../middlewares/restrict.middleware";
import protect from "../../middlewares/auth.middleware";
import applicantRouter from "../applicant/applicant.routes";

const router = Router();

router.route("/job-stats").get(controller.getJobStats);
// router.route("/top-wanted-jobs").get(wantedJobs, getAllJobs);

router
  .route("/")
  .get(controller.getAll)
  .post(protect, restrictTo("company"), controller.create);

router.use("/:job", applicantRouter);

router
  .route("/:id")
  .get(controller.get)
  .patch(controller.update)
  .delete(protect, restrictTo(), controller.delete);

export default router;
