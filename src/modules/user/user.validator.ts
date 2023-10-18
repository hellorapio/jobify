import BaseValidator from "../../bases/base.validator";
import userJoi from "./user.joi";

class UserValidator extends BaseValidator {
  constructor() {
    super(userJoi);
  }
}

export default UserValidator.getInstance();
