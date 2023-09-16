
import express from "express";
import authController from "./auth.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get(
  "/logout",
  authMiddleware.authProtection,
  authController.logout
);

router.post("/forgot", authController.forgotPassword);
router.patch("/reset/:token", authController.resetPassword);
router.patch(
  "/updatePassword",
  authMiddleware.authProtection,
  authController.updatePassword
);

export default router;
