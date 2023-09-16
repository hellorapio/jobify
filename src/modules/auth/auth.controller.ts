import AuthService from "./auth.service";
import authValidator from "./auth.validator";
import validationCatch from "../../utils/validationCatch";
import sendRes from "../../utils/sendRes";
import { Request, Response } from "express";

const signup = async (req: Request, res: Response) => {
  const validatedUser = await validationCatch(
    authValidator.signup,
    req.body
  );
  const token = await AuthService.signup(validatedUser);
  sendRes(res, 201, "", token);
};

const login = async (req: Request, res: Response) => {
  const validatedUser = await validationCatch(
    authValidator.login,
    req.body
  );
  const token = await AuthService.login(validatedUser);
  sendRes(res, 200, "", token);
};

const forgotPassword = async (req: Request, res: Response) => {
  const { email } = await validationCatch(
    authValidator.forgotPassword,
    req.body
  );
  await AuthService.forgotPassword(email, req.protocol, req.get("host")!);
  sendRes(res, 200, "Reset Link has been Sent to the Email");
};

const resetPassword = async (req: Request, res: Response) => {
  const reset = await validationCatch(authValidator.resetPassword, {
    token: req.params.token,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = await AuthService.resetPassword(reset);
  sendRes(res, 200, "", token);
};

const updatePassword = async (req: Request, res: Response) => {
  const validatedPasswords = await validationCatch(
    authValidator.updatePassword,
    {
      currentPassword: req.body.currentPassword,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    }
  );
  const token = await AuthService.updatePassword(
    req.user.id,
    validatedPasswords
  );
  sendRes(res, 200, "", token);
};

const logout = async (req: Request, res: Response) => {
  await AuthService.logout(req.user.id);
  res.cookie("jwt", "");
  sendRes(res, 200);
};

export default {
  login,
  signup,
  logout,
  updatePassword,
  resetPassword,
  forgotPassword,
};
