import BaseValidator from "../../bases/base.validator";
import companyJoi from "./company.joi";

class CompanyValidator extends BaseValidator {
  constructor() {
    super(companyJoi);
  }
}

export default CompanyValidator.getInstance();
