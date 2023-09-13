//@ts-nocheck
import express from "express";
import {
  restrictTo,
  authProtection,
  passwordProtection,
} from "../middlewares/auth";
import { signup } from "../auth/auth.controller";
import { company } from "../middlewares/role";
import { companyUpdate } from "../users/user.controller";
import reviewRouter from "../reviews/review.router";

const router = express.Router();

router.use("/:companyId/reviews", reviewRouter);
router.post("/signup", company, signup);
router.patch(
  "/updateMe",
  authProtection,
  passwordProtection,
  restrictTo("company"),
  companyUpdate
);

export default router;
