import { Router } from "express";
import authController from "./auth.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authMiddleware.protect, authController.logout);

router.post("/forgot", authController.forgotPassword);
router.patch("/reset/:token", authController.resetPassword);
router.patch(
  "/updatePassword",
  authMiddleware.protect,
  authController.updatePassword
);

export default router;
