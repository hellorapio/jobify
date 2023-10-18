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

  static async updateApplicantStatus(body: object) {
    return await validCatch(applicantJoi.updateApplicantStatus, body);
  }

  static async updateApplicantLetter(body: object) {
    return await validCatch(applicantJoi.updateApplicantLetter, body);
  }
}

export default ApplicantValidator.getInstance();
