import { Request, Response } from "express";
import sendRes from "../../utils/sendRes";
import validationCatch from "../../utils/validationCatch";
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

export default { getWorker };
