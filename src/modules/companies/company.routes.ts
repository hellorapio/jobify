import express from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import companyController from "./company.controller";
import reviewRouter from "../reviews/review.routes";

const router = express.Router();

router.use("/:companyId/reviews", reviewRouter);

router
  .route("/updateMe")
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo("company"),
    companyController.addCompany
  )
  .patch(
    authMiddleware.protect,
    authMiddleware.restrictTo("company"),
    companyController.updateCompany
  );

export default router;
