import { Request, Response } from "express";
import sendRes from "../../utils/sendResponse";
import WorkerService from "./worker.service";
import WorkerValidator from "./worker.validator";

class WorkerController {
  static async getWorker(req: Request, res: Response) {
    const { workerId } = await WorkerValidator.workerId(req.params);
    const worker = await WorkerService.getWorker(workerId);
    sendRes(res, 200, worker);
  }

  static async workerUpdate(req: Request, res: Response) {
    const body = await WorkerValidator.updateWorker(req.body);
    const worker = await WorkerService.updateWorker(req.user.id, body);
    sendRes(res, 200, worker);
  }
}

export default WorkerController;
