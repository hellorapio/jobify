import { Router } from "express";
import controller from "./notification.controller";
import restrictTo from "../../middlewares/restrict.middleware";
import protect from "../../middlewares/auth.middleware";

const router = Router();

router
  .route("/")
  .get(protect, restrictTo("worker"), controller.getUserNotifications);

export default router;
