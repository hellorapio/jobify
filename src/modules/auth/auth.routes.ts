import { Router } from "express";
import authController from "./auth.controller";
import protect from "../../middlewares/auth.middleware";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", protect, authController.logout);

router.post("/password/forgot", authController.forgotPassword);
router.patch("/password/update", protect, authController.updatePassword);
router.patch("/reset/:token", authController.resetPassword);

export default router;
