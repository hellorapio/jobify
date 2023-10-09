import validCatch from "../../utils/validCatch";
import userJoi from "./user.joi";

class UserValidator {
  static async updateMe(body: object) {
    return await validCatch(userJoi.updateMe, body);
  }
}

export default UserValidator;
