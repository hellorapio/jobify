import express from "express";

import userController from "./user.controller";
import roleMiddleware from "../../middlewares/role.middleware";
import authMiddleware from "../../middlewares/auth.middleware";

const router = express.Router();

router.patch(
  "/updateMe",
  authMiddleware.authProtection,
  authMiddleware.restrictTo("worker"),
  userController.workerUpdate
);
router.delete(
  "/deleteMe",
  authMiddleware.authProtection,
  userController.deleteMe
);

// router.route("/").get(getAllUsers).post(createUser);
// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
