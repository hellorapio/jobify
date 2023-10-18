import { Router } from "express";
// import ReviewController from "./review.controller";
// import protect from "../../middlewares/auth.middleware";
// import restrictTo from "../../middlewares/restrict.middleware";

const router = Router({ mergeParams: true });

// router
//   .route("/")
//   .get(ReviewController.getReviews)
//   .post(protect, restrictTo("worker"), ReviewController.createReview);

// router
//   .route("/:reviewId")
//   .patch(protect, restrictTo("worker"), ReviewController.updateReview);

export default router;
