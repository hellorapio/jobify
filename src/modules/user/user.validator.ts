import validCatch from "../../utils/validCatch";
import userJoi from "./user.joi";

class UserValidator {
  static async updateMe(body: object) {
    const data = validCatch(userJoi.updateMe, body);
    return data;
  }
}

export default UserValidator;
