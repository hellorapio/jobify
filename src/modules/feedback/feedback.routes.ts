import { Router } from "express";
import feedbackController from "./feedback.controller";

const router = Router();

router.route("/").post(feedbackController.create);

export default router;
