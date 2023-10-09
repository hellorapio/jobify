import validCatch from "../../utils/validCatch";
import companyJoi from "./company.joi";

class CompanyValidator {
  static async createCompany(body: Object) {
    return await validCatch(companyJoi.createCompany, body);
  }
  static async updateCompany(body: Object) {
    return await validCatch(companyJoi.updateCompany, body);
  }
}

export default CompanyValidator;
