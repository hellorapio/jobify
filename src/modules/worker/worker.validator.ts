import validCatch from "../../utils/validCatch";
import workerJoi from "./worker.joi";

class WorkerValidator {
  static async workerId(body: object) {
    const data = await validCatch(workerJoi.workerId, body);
    return data;
  }
  static async updateWorker(body: object) {
    const data = await validCatch(workerJoi.updateWorker, body);
    return data;
  }
}

export default WorkerValidator;
