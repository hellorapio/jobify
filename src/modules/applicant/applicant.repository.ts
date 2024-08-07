import BaseRepository from "../../bases/base.repository";
import QueryBuilder from "../../utils/queryBuilder";
import { IApplicant } from "./model/applicant.interface";
import Applicant from "./model/applicant.model";

class ApplicantRepository extends BaseRepository<IApplicant> {
  constructor() {
    super(Applicant);
  }

  override async find(queryObj?: any): Promise<any> {
    return await new QueryBuilder(this.model, queryObj).execute();
  }
}

export default ApplicantRepository.getInstance<ApplicantRepository>();
