import authService from "./auth.service";
import authValidator from "./auth.validator";
import sendResponse from "../../utils/sendResponse";
import { Request, Response } from "express";

class AuthController {
  private static instance: AuthController;

  private constructor(
    private service: typeof authService,
    private validator: typeof authValidator
  ) {
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.verifyUser = this.verifyUser.bind(this);
  }

  public static getInstance() {
    if (!AuthController.instance)
      AuthController.instance = new AuthController(
        authService,
        authValidator
      );
    return AuthController.instance;
  }

  async signup(req: Request, res: Response) {
    const validatedUser = await this.validator.signup(req.body);
    const token = await this.service.signup(
      validatedUser,
      req.protocol + "://" + req.hostname + "/api/v1"
    );
    sendResponse(res, 201, undefined, token);
  }

  async login(req: Request, res: Response) {
    const validatedUser = await this.validator.login(req.body);
    const token = await this.service.login(validatedUser);
    sendResponse(res, 200, undefined, token);
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = await this.validator.forgotPassword(req.body);
    await this.service.forgotPassword(
      email,
      req.protocol + "://" + req.hostname + "/api/v1"
    );
    sendResponse(res, 200, "Reset Link has been Sent to the Email");
  }

  async resetPassword(req: Request, res: Response) {
    const { token: reset } = await this.validator.token(req.params);
    const { password } = await this.validator.resetPassword(req.body);
    const token = await this.service.resetPassword(reset, password);
    sendResponse(res, 200, undefined, token);
  }

  async updatePassword(req: Request, res: Response) {
    const { id } = req.user;
    const passwords = await this.validator.updatePassword(req.body);
    const token = await this.service.updatePassword(id, passwords);
    sendResponse(res, 200, undefined, token);
  }

  async logout(req: Request, res: Response) {
    await this.service.logout(req.user.id);
    sendResponse(res, 200, undefined, "");
  }

  async verifyUser(req: Request, res: Response) {
    const { token } = await this.validator.token(req.params);
    await this.service.verifyUser(token);
    sendResponse(res, 200, "The Email has been Verified");
  }
}

export default AuthController.getInstance();
