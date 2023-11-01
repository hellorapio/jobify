import { Router } from "express";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";
import controller from "./subscription.controller";

const router = Router();

router
  .route("/")
  .all(protect, restrictTo("company"))
  .post(controller.create);

export default router;
