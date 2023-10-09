import validCatch from "../../utils/validCatch";
import workerJoi from "./worker.joi";

class WorkerValidator {
  static async workerId(body: object) {
    return await validCatch(workerJoi.workerId, body);
  }

  static async updateWorker(body: object) {
    return await validCatch(workerJoi.updateWorker, body);
  }

  static async createWorker(body: object) {
    return await validCatch(workerJoi.updateWorker, body);
  }
}

export default WorkerValidator;
