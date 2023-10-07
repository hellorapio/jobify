import BaseRepository from "../../repository/baseRepository";
import { IWorker } from "./model/worker.interface";
import Worker from "./model/worker.model";

class WorkerRepository extends BaseRepository<IWorker> {
  constructor() {
    super(Worker);
  }
}

export default new WorkerRepository();
