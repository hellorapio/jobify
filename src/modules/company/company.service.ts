import { ICompany } from "./model/company.interface";
import companyRepository from "./company.repository";
import NotFound from "../../errors/notFound";
import { ObjectId } from "mongoose";
import BaseService from "../../bases/base.service";

class CompanyService extends BaseService<ICompany> {
  constructor() {
    super(companyRepository);
  }

  override async create(body: Partial<ICompany>, userId?: ObjectId) {
    return await this.repo.insertOne({
      ...body,
      userId,
    });
  }

  override async update(userId: any, body: Partial<ICompany>) {
    const company = await this.repo.updateOne({ userId }, body);

    if (!company) throw new NotFound("There is no user found");
    return company;
  }
}

export default CompanyService.getInstance();
