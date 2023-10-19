import { Router } from "express";
import protect from "../../middlewares/auth.middleware";
import controller from "./company.controller";
import reviewRouter from "../review/review.routes";
import restrictTo from "../../middlewares/restrict.middleware";

const router = Router();

router.use("/:companyId/reviews", reviewRouter);

router
  .route("/me")
  .all(protect, restrictTo("company"))
  .patch(controller.update);

export default router;
