import { ICompany } from "./model/company.interface";
import companyRepository from "./company.repository";
import NotFound from "../../errors/notFound";
import { ObjectId } from "mongoose";
import BaseService from "../../bases/base.service";

class CompanyService extends BaseService<ICompany> {
  constructor() {
    super(companyRepository);
  }

  override async create(body: Partial<ICompany>, user?: ObjectId) {
    return await this.repo.insertOne({
      ...body,
      user,
    });
  }

  override async update(user: any, body: Partial<ICompany>) {
    const company = await this.repo.updateOne({ user }, body);

    if (!company) throw new NotFound("There is no user found");
    return company;
  }
}

export default CompanyService.getInstance();
