import { Router } from "express";
import controller from "./review.controller";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";

const router = Router({ mergeParams: true });

router.route("/stats").all(protect).get(controller.reviewStats);

router.get("/", protect, controller.getAll);

router
  .route("/")
  .all(protect, restrictTo("worker"))
  .post(controller.create)
  .patch(controller.update)
  .delete(controller.delete);

export default router;
