import { Router } from "express";
import protect from "../../middlewares/auth.middleware";
import controller from "./company.controller";
import reviewRouter from "../review/review.routes";
// import jobRouter from "../job/job.routes";
import restrictTo from "../../middlewares/restrict.middleware";
import jobController from "../job/job.controller";

const router = Router();

router.use("/:username/reviews", reviewRouter);
router.use("/:username/jobs", jobController.getAll);

router
  .route("/me")
  .all(protect, restrictTo("company"))
  .patch(controller.update);

export default router;
