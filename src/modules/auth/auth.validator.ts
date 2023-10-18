import { Schema } from "joi";
import validCatch from "../../utils/validCatch";
import { IUser } from "../user/model/user.interface";
import authJoi from "./auth.joi";

class AuthValidator {
  private static instance: AuthValidator;
  private constructor(private joi: Record<string, Schema>) {}
  public static getInstance() {
    if (!AuthValidator.instance)
      AuthValidator.instance = new AuthValidator(authJoi);
    return AuthValidator.instance;
  }

  async login(body: Partial<IUser>) {
    return await validCatch(this.joi.login, body);
  }

  async signup(body: Partial<IUser>) {
    return await validCatch(this.joi.signup, body);
  }

  async token(token: object) {
    return await validCatch(this.joi.token, token);
  }

  async resetPassword(body: object) {
    return await validCatch(this.joi.resetPassword, body);
  }

  async updatePassword(body: Partial<IUser>) {
    return await validCatch(this.joi.updatePassword, body);
  }

  async forgotPassword(body: Partial<IUser>) {
    return await validCatch(this.joi.forgotPassword, body);
  }
}

export default AuthValidator.getInstance();
