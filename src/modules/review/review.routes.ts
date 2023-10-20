import { Router } from "express";
import controller from "./review.controller";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";

const router = Router({ mergeParams: true });

router
  .route("/")
  .all(protect)
  .get(controller.getAll)
  .post(restrictTo("worker"), controller.create);

router
  .route("/:reviewId")
  .patch(protect, restrictTo("worker"), controller.updateReview);

export default router;
