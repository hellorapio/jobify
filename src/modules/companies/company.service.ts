import AppError from "../../utils/appError";
import Company, { ICompany } from "./company.model";

class CompanyService {
  static async addCompany(companyId: string, companyBody: ICompany) {
    return await Company.create({
      ...companyBody,
      companyId,
    });
  }

  static async updateCompany(companyId: string, companyBody: ICompany) {
    const company = await Company.findOneAndUpdate(
      { companyId },
      companyBody,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!company) throw new AppError("There is no user found", 404);
    return company;
  }
}

export default CompanyService;
