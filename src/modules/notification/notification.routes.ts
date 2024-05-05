import { Router } from "express";
import controller from "./notification.controller";
import protect from "../../middlewares/auth.middleware";

const router = Router();

router
  .route("/")
  .get(protect, controller.getUserNotifications)
  .post(protect, controller.readNotifications);

export default router;
