import BaseValidator from "../../bases/base.validator";
import validCatch from "../../utils/validCatch";
import applicantJoi from "./applicant.joi";

class ApplicantValidator extends BaseValidator {
  constructor() {
    super(applicantJoi);
  }

  async updateStatus(body: object) {
    return await validCatch(this.joi.updateStatus, body);
  }

  async updateLetter(body: object) {
    return await validCatch(this.joi.updateLetter, body);
  }
}

export default ApplicantValidator.getInstance<ApplicantValidator>();
