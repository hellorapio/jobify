import BaseValidator from "../../bases/base.validator";
import validCatch from "../../utils/validCatch";
import workerJoi from "./worker.joi";

class WorkerValidator extends BaseValidator {
  constructor() {
    super(workerJoi);
  }

  async workerId(body: object) {
    return await validCatch(workerJoi.workerId, body);
  }
}

export default WorkerValidator.getInstance();
