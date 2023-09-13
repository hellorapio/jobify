//@ts-nocheck
import express from "express";
import {
  getReviews,
  updateReview,
  createReview,
} from "./review.controller";
import { restrictTo, authProtection } from "../middlewares/auth";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getReviews)
  .post(authProtection, restrictTo("worker"), createReview);

router
  .route("/:reviewId")
  .patch(authProtection, restrictTo("worker"), updateReview);

export default router;
