import { Request, Response } from "express";
import { IWorker } from "./model/worker.interface";
import service from "./worker.service";
import validator from "./worker.validator";
import sendResponse from "../../utils/sendResponse";
import BaseController from "../../bases/base.controller";

class WorkerController extends BaseController<IWorker, typeof service> {
  constructor() {
    super(service, validator);
    this.me = this.me.bind(this);
  }

  override async get(req: Request, res: Response) {
    const { username } = await this.validator.username(req.params);
    const worker = await this.service.get(username);
    sendResponse(res, 200, worker);
  }

  override async update(req: Request, res: Response) {
    const body = await this.validator.update(req.body);
    const worker = await this.service.update(req.user.id, body);
    sendResponse(res, 200, worker);
  }

  async me(req: Request, res: Response) {
    const worker = await this.service.me(req.user.id);
    sendResponse(res, 200, worker);
  }
}

export default WorkerController.getInstance<WorkerController>();
