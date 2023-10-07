import { IWorker } from "./model/worker.interface";
import NotFound from "../../errors/notFound";
import workerRepository from "./worker.repository";
import { ObjectId } from "mongoose";

class WorkerService {
  static async getWorker(workerId: string) {
    const worker = await workerRepository.findById(workerId);
    if (!worker) throw new NotFound("There is no user found");
    return worker;
  }

  static async updateWorker(workerId: ObjectId, body: IWorker) {
    const worker = await workerRepository.updateOne(
      { userId: workerId },
      body
    );
    if (!worker) throw new NotFound("There is no user Found");
    return worker;
  }
}

export default WorkerService;
