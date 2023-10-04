import { Request, Response } from "express";
import sendRes from "../../utils/sendResponse";
import validationCatch from "../../utils/validCatch";
import WorkerService from "./worker.service";
import workerValidator from "./worker.validator";

const getWorker = async (req: Request, res: Response) => {
  const { workerId } = await validationCatch(
    workerValidator.workerId,
    req.params
  );
  const worker = await WorkerService.getWorker(workerId);
  sendRes(res, 200, worker);
};

const workerUpdate = async (req: Request, res: Response) => {
  const body = await validationCatch(
    workerValidator.updateWorker,
    req.body
  );
  const worker = await WorkerService.updateWorker(req.user.id, body);
  sendRes(res, 200, worker);
};

export default { getWorker, workerUpdate };
