import BaseValidator from "../../bases/base.validator";
import validCatch from "../../utils/validCatch";
import applicantJoi from "./applicant.joi";

class ApplicantValidator extends BaseValidator {
  constructor() {
    super(applicantJoi);
  }
  static async ids(body: object) {
    return await validCatch(applicantJoi.ids, body);
  }

  static async updateStatus(body: object) {
    return await validCatch(applicantJoi.updateStatus, body);
  }

  static async updateLetter(body: object) {
    return await validCatch(applicantJoi.updateLetter, body);
  }
}

export default ApplicantValidator.getInstance();
