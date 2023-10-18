import { ICompany } from "./model/company.interface";
import companyRepository from "./company.repository";
import NotFound from "../../errors/notFound";
import { ObjectId } from "mongoose";
import BaseService from "../../bases/base.service";

class CompanyService extends BaseService<ICompany> {
constructor() {
    super(companyRepository);
  }

  async createCompany(userId: ObjectId, companyBody: ICompany) {
    return await this.repo.insertOne({
      ...companyBody,
      userId,
    });
  }

  async updateCompany(userId: ObjectId, companyBody: ICompany) {
    const company = await this.repo.updateOne({ userId }, companyBody);

    if (!company) throw new NotFound("There is no user found");
    return company;
  }
}

export default CompanyService.getInstance();
