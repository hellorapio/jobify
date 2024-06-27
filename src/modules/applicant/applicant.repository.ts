import BaseRepository from "../../bases/base.repository";
import QueryBuilder from "../../utils/queryBuilder";
import { IApplicant } from "./model/applicant.interface";
import Applicant from "./model/applicant.model";

class ApplicantRepository extends BaseRepository<IApplicant> {
  constructor() {
    super(Applicant);
  }

  override async find(filter: any, queryObj?: any): Promise<any> {
    return await new QueryBuilder(
      this.model.find(filter),
      queryObj
    ).paginate().query;
  }
}

export default ApplicantRepository.getInstance<ApplicantRepository>();
