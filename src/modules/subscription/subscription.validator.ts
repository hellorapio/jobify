import BaseValidator from "../../bases/base.validator";
import subscriptionJoi from "./subscription.joi";

class SubValidator extends BaseValidator {
  constructor() {
    super(subscriptionJoi);
  }
}

export default SubValidator.getInstance<SubValidator>();
