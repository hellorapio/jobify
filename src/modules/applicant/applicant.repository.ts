import BaseRepository from "../../bases/base.repository";
import APIFeatures from "../../utils/apiFeatures";
import { IApplicant } from "./model/applicant.interface";
import Applicant from "./model/applicant.model";

class ApplicantRepository extends BaseRepository<IApplicant> {
  constructor() {
    super(Applicant);
  }
  
  override async find(filter: any, queryObj?: any): Promise<any> {
    return await new APIFeatures(this.model.find(filter), queryObj).query;
  }

}

export default ApplicantRepository.getInstance<ApplicantRepository>();
