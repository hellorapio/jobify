import BaseValidator from "../../bases/base.validator";
import validCatch from "../../utils/validCatch";
import jobJoi from "./job.joi";

class JobValidator extends BaseValidator {
  constructor() {
    super(jobJoi);
  }

  async withIn(data: object) {
    return await validCatch(this.joi.withIn, data);
  }

  async suggestions(data: object) {
    return await validCatch(this.joi.suggestions, data);
  
  }
}

export default JobValidator.getInstance<JobValidator>();
