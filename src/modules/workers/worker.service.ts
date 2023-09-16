import AppError from "../../utils/appError";
import Worker from "./worker.model";

class WorkerService {
  static async getWorker(workerId: string) {
    const worker = await Worker.findById(workerId);
    if (!worker) throw new AppError("There is no user found", 404);
    return worker;
  }
}

export default WorkerService;
