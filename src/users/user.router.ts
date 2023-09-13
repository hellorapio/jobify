//@ts-nocheck
import express from "express";

import {
  getAllUsers,
  // getUser,
  // createUser,
  // updateUser,
  // deleteUser,
  workerUpdate,
  deleteMe,
} from "./user.controller";
import { worker } from "../middlewares/role";
import {
  restrictTo,
  authProtection,
  passwordProtection,
} from "../middlewares/auth";

const router = express.Router();

router.patch(
  "/updateMe",
  authProtection,
  passwordProtection,
  restrictTo("worker"),
  workerUpdate
);
router.delete("/deleteMe", authProtection, deleteMe);

// router.route("/").get(getAllUsers).post(createUser);
// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
