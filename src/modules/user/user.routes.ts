import { Router } from "express";

import controller from "./user.controller";
import protect from "../../middlewares/auth.middleware";
import reviewRouter from "../review/review.routes";
import jobController from "../job/job.controller";
import uploadMiddleware from "../../middlewares/upload.middleware";
import imgValidator from "../../middlewares/imgVal.middleware";
const router = Router();

router
  .route("/me")
  .all(protect)
  .get(controller.me)
  .patch(uploadMiddleware, imgValidator, controller.update)
  .delete(controller.delete);

router.route("/:username").all(protect).get(controller.get);

router.use("/:username/reviews", reviewRouter);
router.use("/:username/jobs", jobController.getAll);

export default router;
