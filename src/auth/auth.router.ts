//@ts-nocheck
import express from "express";

import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  logout,
} from "./auth.controller";

import { authProtection } from "../middlewares/auth";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", authProtection, logout);

router.post("/forgot", forgotPassword);
router.patch("/reset/:token", resetPassword);
router.patch("/updatePassword", authProtection, updatePassword);

export default router;
