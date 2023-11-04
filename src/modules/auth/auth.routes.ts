import { Router } from "express";
import controller from "./auth.controller";
import protect from "../../middlewares/auth.middleware";

const router = Router();

router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/logout", protect, controller.logout);

router.post("/email-verification/:token", controller.verifyUser);
router.patch("/reset/:token", controller.resetPassword);

router.post("/password/forgot", controller.forgotPassword);
router.patch("/password/update", protect, controller.updatePassword);

export default router;
