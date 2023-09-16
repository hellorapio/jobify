//@ts-nocheck
import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import authController from "../auth/auth.controller";
import { company } from "../../middlewares/role.middleware";
import { companyUpdate } from "../users/user.controller";
import reviewRouter from "../reviews/review.routes";

const router = express.Router();

router.use("/:companyId/reviews", reviewRouter);
router.post("/signup", company, authController.signup);
router.patch(
  "/updateMe",
  authMiddleware.authProtection,
  authMiddleware.restrictTo("company"),
  companyUpdate
);

export default router;
