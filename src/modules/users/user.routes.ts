import { Router } from "express";

import userController from "./user.controller";
import authMiddleware from "../../middlewares/auth.middleware";

const router = Router();

// router.patch(
//   "/updateMe",
//   authMiddleware.protect,
//   authMiddleware.restrictTo("worker"),
//   userController.workerUpdate
// );
router.delete(
  "/deleteMe",
  authMiddleware.protect,
  userController.deleteMe
);

// router.route("/").get(getAllUsers).post(createUser);
// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
