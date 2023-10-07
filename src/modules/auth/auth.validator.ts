import validCatch from "../../utils/validCatch";
import { IUser } from "../user/model/user.interface";
import authJoi from "./auth.joi";

class AuthValidator {
  static async login(body: Partial<IUser>) {
    const data = await validCatch(authJoi.login, body);
    return data;
  }
  static async signup(body: Partial<IUser>) {
    const data = await validCatch(authJoi.signup, body);
    return data;
  }
  static async token(token: object) {
    const data = await validCatch(authJoi.token, token);
    return data;
  }
  static async resetPassword(body: object) {
    const data = await validCatch(authJoi.resetPassword, body);
    return data;
  }
  static async updatePassword(body: Partial<IUser>) {
    const data = await validCatch(authJoi.updatePassword, body);
    return data;
  }
  static async forgotPassword(body: Partial<IUser>) {
    const data = await validCatch(authJoi.forgotPassword, body);
    return data;
  }
}

export default AuthValidator;
