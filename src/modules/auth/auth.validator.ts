import validCatch from "../../utils/validCatch";
import { IUser } from "../user/model/user.interface";
import authJoi from "./auth.joi";

class AuthValidator {
  static async login(body: Partial<IUser>) {
    return await validCatch(authJoi.login, body);
  }

  static async signup(body: Partial<IUser>) {
    return await validCatch(authJoi.signup, body);
  }

  static async token(token: object) {
    return await validCatch(authJoi.token, token);
  }

  static async resetPassword(body: object) {
    return await validCatch(authJoi.resetPassword, body);
  }

  static async updatePassword(body: Partial<IUser>) {
    return await validCatch(authJoi.updatePassword, body);
  }

  static async forgotPassword(body: Partial<IUser>) {
    return await validCatch(authJoi.forgotPassword, body);
  }
}

export default AuthValidator;
