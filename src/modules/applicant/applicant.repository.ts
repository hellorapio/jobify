import BaseRepository from "../../bases/base.repository";
import { IApplicant } from "./model/applicant.interface";
import Applicant from "./model/applicant.model";

class ApplicantRepository extends BaseRepository<IApplicant> {
  constructor() {
    super(Applicant);
  }
}

export default ApplicantRepository.getInstance<ApplicantRepository>();
