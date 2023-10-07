import AuthService from "./auth.service";
import AuthValidator from "./auth.validator";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";

class AuthController {
  static async signup(req: Request, res: Response) {
    const validatedUser = await AuthValidator.signup(req.body);
    const token = await AuthService.signup(validatedUser);
    sendResponse(res, 201, undefined, token);
  }

  static async login(req: Request, res: Response) {
    const validatedUser = await AuthValidator.login(req.body);
    const token = await AuthService.login(validatedUser);
    sendResponse(res, 200, undefined, token);
  }

  static async forgotPassword(req: Request, res: Response) {
    const { email } = await AuthValidator.forgotPassword(req.body);
    await AuthService.forgotPassword(email, req);
    sendResponse(res, 200, "Reset Link has been Sent to the Email");
  }

  static async resetPassword(req: Request, res: Response) {
    const { token: reset } = await AuthValidator.token(req.params);
    const { password } = await AuthValidator.resetPassword(req.body);
    const token = await AuthService.resetPassword(reset, password);
    sendResponse(res, 200, undefined, token);
  }

  static async updatePassword(req: Request, res: Response) {
    const passwords = await AuthValidator.updatePassword(req.body);
    const token = await AuthService.updatePassword(req.user.id, passwords);
    sendResponse(res, 200, undefined, token);
  }

  static async logout(req: Request, res: Response) {
    await AuthService.logout(req.user.id);
    sendResponse(res, 200, undefined, "");
  }
}

export default AuthController;
