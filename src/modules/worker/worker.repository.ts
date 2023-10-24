import BaseRepository from "../../bases/base.repository";
import { IWorker } from "./model/worker.interface";
import Worker from "./model/worker.model";

class WorkerRepository extends BaseRepository<IWorker> {
  constructor() {
    super(Worker);
  }
}

export default WorkerRepository.getInstance<WorkerRepository>();
