import { Router } from "express";
import {
  getReviews,
  updateReview,
  createReview,
} from "./review.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(getReviews)
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo("worker"),
    createReview
  );

router
  .route("/:reviewId")
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo("worker"),
    updateReview
  );

export default router;
