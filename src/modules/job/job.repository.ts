import BaseRepository from "../../bases/base.repository";
import QueryBuilder from "../../utils/queryBuilder";
import { IJob } from "./model/job.interface";
import Job from "./model/job.model";

class JobRepository extends BaseRepository<IJob> {
  constructor() {
    super(Job);
  }

  override async find(queryObj?: any): Promise<any> {
    return await new QueryBuilder(this.model, queryObj).execute();
  }

  override async findById(id: string, select: string = "") {
    return await this.model.findById(id).select(select);
  }

  override async findOne(filter: object, select: string = "") {
    return await this.model.findOne(filter).select(select);
  }
}

export default JobRepository.getInstance<JobRepository>();
