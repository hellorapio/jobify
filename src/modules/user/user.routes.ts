import { Router } from "express";

import userController from "./user.controller";
import protect from "../../middlewares/auth.middleware";

const router = Router();

router
  .route("/me")
  .all(protect)
  .get(userController.me)
  .patch(userController.update)
  .delete(userController.delete);

export default router;
