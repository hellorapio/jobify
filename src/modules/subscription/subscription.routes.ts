import { Router } from "express";
import protect from "../../middlewares/auth.middleware";
import restrictTo from "../../middlewares/restrict.middleware";
import controller from "./subscription.controller";
import SubscriptionMiddleware from "./subscription.middleware";

const router = Router();

router
  .route("/checkout/:plan/:duration")
  .all(protect, restrictTo("company"))
  .get(SubscriptionMiddleware.checkPlan, controller.getSession);

export default router;
