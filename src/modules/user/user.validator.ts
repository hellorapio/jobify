import BaseValidator from "../../bases/base.validator";
import validCatch from "../../utils/validCatch";
import userJoi from "./user.joi";

class UserValidator extends BaseValidator {
  constructor() {
    super(userJoi);
  }

  async updateCompany(body: object) {
    return await validCatch(this.joi.updateCompany, body);
  }
  async updateWorker(body: object) {
    return await validCatch(this.joi.updateWorker, body);
  }
}

export default UserValidator.getInstance<UserValidator>();
