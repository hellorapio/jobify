import BaseRepository from "../../bases/base.repository";
import { IJob } from "./model/job.interface";
import Job from "./model/job.model";

class JobRepository extends BaseRepository<IJob> {
  constructor() {
    super(Job);
  }
}

export default JobRepository.getInstance();
