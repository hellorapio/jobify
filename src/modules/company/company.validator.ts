import validCatch from "../../utils/validCatch";
import companyJoi from "./company.joi";

class CompanyValidator {
  static async createCompany(body: Object) {
    const data = validCatch(companyJoi.createCompany, body);
    return data;
  }
  static async updateCompany(body: Object) {
    const data = validCatch(companyJoi.updateCompany, body);
    return data;
  }
}

export default CompanyValidator;
