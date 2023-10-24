import BaseRepository from "../../bases/base.repository";
import { ICompany } from "./model/company.interface";
import Company from "./model/company.model";

class CompanyRepository extends BaseRepository<ICompany> {
  constructor() {
    super(Company);
  }

}

export default CompanyRepository.getInstance<CompanyRepository>();
