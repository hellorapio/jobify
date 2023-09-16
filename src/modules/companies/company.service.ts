import Company, { ICompany } from "./company.model";

class CompanyService {
  static async addCompany(companyId: string, companyBody: ICompany) {
    return await Company.create({
      ...companyBody,
      companyId,
    });
  }
}

export default CompanyService;
