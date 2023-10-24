import BaseValidator from "../../bases/base.validator";
import jobJoi from "./job.joi";

class JobValidator extends BaseValidator {
  constructor() {
    super(jobJoi);
  }
}

export default JobValidator.getInstance<JobValidator>();
