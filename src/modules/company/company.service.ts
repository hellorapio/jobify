import { ICompany } from "./model/company.interface";
import companyRepository from "./company.repository";
import NotFound from "../../errors/notFound";
import { ObjectId } from "mongoose";

class CompanyService {
  static async createCompany(companyId: ObjectId, companyBody: ICompany) {
    return await companyRepository.insertOne({
      ...companyBody,
      companyId,
    });
  }

  static async updateCompany(companyId: ObjectId, companyBody: ICompany) {
    const company = await companyRepository.updateOne(
      { companyId },
      companyBody
    );

    if (!company) throw new NotFound("There is no user found");
    return company;
  }
}

export default CompanyService;
