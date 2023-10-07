import { Router } from "express";

import UserController from "./user.controller";
import protect from "../../middlewares/auth.middleware";

const router = Router();

router
  .route("/me")
  .all(protect)
  .get(UserController.me)
  .patch(UserController.updateMe)
  .delete(UserController.deleteMe);

export default router;
