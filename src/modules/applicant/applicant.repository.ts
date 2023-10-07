import BaseRepository from "../../repository/baseRepository";
import { IApplicant } from "./model/applicant.interface";
import Applicant from "./model/applicant.model";

class ApplicantRepository extends BaseRepository<IApplicant> {
  constructor() {
    super(Applicant);
  }
}

export default new ApplicantRepository();
