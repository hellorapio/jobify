import BaseValidator from "../../bases/base.validator";
import validCatch from "../../utils/validCatch";
import companyJoi from "./company.joi";

class CompanyValidator extends BaseValidator {
  constructor() {
    super(companyJoi);
  }

  // static async createCompany(body: Object) {
  //   return await validCatch(companyJoi.createCompany, body);
  // }
  static async updateCompany(body: Object) {
    return await validCatch(companyJoi.updateCompany, body);
  }
}

export default CompanyValidator.getInstance();
