import AppError from "../../utils/appError";
import Worker, { IWorker } from "./worker.model";

class WorkerService {
  static async getWorker(workerId: string) {
    const worker = await Worker.findById(workerId);
    if (!worker) throw new AppError("There is no user found", 404);
    return worker;
  }

  static async updateWorker(workerId: string, body: IWorker) {
    const worker = await Worker.findOneAndUpdate(
      { userId: workerId },
      body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!worker) throw new AppError("There is no user Found", 404);
    return worker;
  }
}

export default WorkerService;
