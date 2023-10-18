import { Router } from "express";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";
import controller from "./worker.controller";

const router = Router();

router
  .route("/me")
  .all(protect, restrictTo("worker"))
  .get(controller.me)
  .patch(controller.update);

router.route("/:username").all(protect).get(controller.get);

export default router;
