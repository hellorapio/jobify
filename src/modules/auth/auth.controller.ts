import AuthService from "./auth.service";
import AuthValidator from "./auth.validator";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";

const signup = async (req: Request, res: Response) => {
  const validatedUser = await AuthValidator.signup(req.body);
  const token = await AuthService.signup(validatedUser);
  sendResponse(res, 201, "", token);
};

const login = async (req: Request, res: Response) => {
  const validatedUser = await AuthValidator.login(req.body);
  const token = await AuthService.login(validatedUser);
  sendResponse(res, 200, "", token);
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = await AuthValidator.forgotPassword(req.body);
  await AuthService.forgotPassword(email, req.protocol, req.get("host")!);
  sendResponse(res, 200, "Reset Link has been Sent to the Email");
};

const resetPassword = async (req: Request, res: Response) => {
  const reset = await AuthValidator.resetPassword({
    token: req.params.token,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = await AuthService.resetPassword(reset);
  sendResponse(res, 200, "", token);
};

const updatePassword = async (req: Request, res: Response) => {
  const validatedPasswords = await AuthValidator.updatePassword(req.body);

  const token = await AuthService.updatePassword(
    req.user.id,
    validatedPasswords
  );
  sendResponse(res, 200, "", token);
};

const logout = async (req: Request, res: Response) => {
  await AuthService.logout(req.user.id);
  sendResponse(res, 200);
};

export default {
  login,
  signup,
  logout,
  updatePassword,
  resetPassword,
  forgotPassword,
};
